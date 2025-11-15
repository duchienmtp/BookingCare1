import os
from dotenv import load_dotenv
from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langgraph.graph.message import add_messages
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from typing import TypedDict, List, Literal, Annotated
import sys

load_dotenv()

# Import SQL Agent và QA Chain
from sql_agent import test_agent as sql_agent
from qa_agent import test_qa_agent as qa_agent

# LLM cho router
llm = ChatGroq(
    temperature=0,
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.3-70b-versatile"
)

# Router prompt, yêu cầu phân loại bằng tiếng Việt
router_prompt = PromptTemplate(
    template="""Bạn là một bộ định tuyến thông minh. Phân loại câu hỏi sau đây:
    - Nếu câu hỏi liên quan đến tìm kiếm, liệt kê, hoặc truy vấn thông tin về các gói khám, bác sĩ, lịch hẹn, hoặc bất kỳ thông tin nào cần truy vấn cơ sở dữ liệu, hãy trả lời chính xác: SQL
    - Nếu câu hỏi là về kiến thức y khoa, giải thích thuật ngữ, hoặc câu hỏi chung không cần truy vấn cơ sở dữ liệu, hãy trả lời chính xác: QA

Chỉ trả về một trong hai từ khóa: SQL hoặc QA, không thêm bất kỳ văn bản nào khác.

Ví dụ:
- "Tôi muốn tìm bác sĩ nội tổng quát" -> SQL
- "Bệnh tiểu đường là gì?" -> QA

Câu hỏi cần phân loại: {input}

Phân loại:""",
    input_variables=["input"]
)

# Hàm router
def router(state):
    input_text = state['input']
    try:
        response = llm.invoke(router_prompt.format(input=input_text)).content.strip()
        # Chỉ chấp nhận 'SQL' hoặc 'QA', bất kể chữ hoa/thường
        classification = response.upper()
        if classification not in ["SQL", "QA"]:
            # Nếu không phải là SQL hoặc QA, mặc định về QA
            classification = "QA"
        return {"classification": classification, "input": input_text}
    except Exception as e:
        print(f"Error in router: {e}")
        # Mặc định về QA nếu có lỗi
        return {"classification": "QA", "input": input_text}

# Hàm SQL Agent node
def sql_node(state):
    input_text = state['input']
    response = sql_agent(input_text)
    return {"output": response}

# Hàm QA Agent node
def qa_node(state):
    input_text = state['input']
    response = qa_agent(input_text)
    return {"output": response}

# Define the state schema
class AgentState(TypedDict):
    input: str
    classification: Literal["SQL", "QA"]
    output: str

# Xây dựng graph
graph = StateGraph(AgentState)

graph.add_node("router", router)
graph.add_node("sql", sql_node)
graph.add_node("qa", qa_node)

graph.set_entry_point("router")

graph.add_conditional_edges(
    "router",
    lambda state: state["classification"],
    {"SQL": "sql", "QA": "qa"}
)

graph.add_edge("sql", END)
graph.add_edge("qa", END)

# Compile graph
multi_agent = graph.compile()

# Function để test multi-agent
def test_multi_agent(input_text):
    response = multi_agent.invoke({"input": input_text, "classification": "", "output": ""})
    return response['output']

# Nhận tham số từ command line
if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_text = sys.argv[1]
        result = test_multi_agent(input_text)
        print(result)
    else:
        print("No input provided.")