import os
from dotenv import load_dotenv
from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits.sql.base import create_sql_agent
from langchain_groq import ChatGroq
from langchain.memory import ConversationSummaryMemory
from langchain.prompts import PromptTemplate
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from sqlalchemy import create_engine
import logging
from langchain.agents import AgentExecutor
from langchain_core.prompts import PromptTemplate
from langchain.agents.agent_types import AgentType
from pydantic import BaseModel

# Cấu hình mã hóa UTF-8
import sys
sys.stdout.reconfigure(encoding='utf-8')

class AgentInput(BaseModel):
    query: str

# Cấu hình logging
logging.basicConfig(
    filename='query_logs.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Cấu hình kết nối DB
db_uri = f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
try:
    db = SQLDatabase.from_uri(db_uri)
    logger.info("Successfully connected to database")
except Exception as e:
    logger.error(f"Failed to connect to database: {e}")
    raise Exception(f"Database connection failed: {e}")

# Khởi tạo LLM từ Groq
llm = ChatGroq(
    temperature=0.3,
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.3-70b-versatile",
)

# Memory cho agent
memory = ConversationSummaryMemory(llm=llm, memory_key="chat_history")

# Prompt tùy chỉnh để tránh hallucination và trả lời bằng tiếng Việt
custom_prefix = """
You are a SQL expert querying the BookingCare MySQL database. ALWAYS use the tools to list tables and describe schemas BEFORE writing any SQL query. Do NOT assume table or column names—query the schema every time.

Always answer in Vietnamese, politely. If no data, say "Không tìm thấy dữ liệu phù hợp" without fabricating.

Follow these steps:
1. Use 'list_tables' to get available tables.
2. Use 'describe_tables' to confirm columns (e.g., 'health_check_packages' may have 'packageId', 'packageName').
3. Use 'query' to execute SQL queries, ensuring only valid tables and columns are used.
4. For listing queries (e.g., 'liệt kê'), analyze the input keywords and search for related packages by combining terms flexibly (e.g., if input is 'Phẫu thuật bao quy đầu', search for '%Phẫu thuật%bao quy đầu%' OR '%cắt bao quy đầu%'). Return the result in this exact format: "Dưới đây là danh sách các gói: [list of package names, separated by commas]".
5. For yes/no questions (e.g., 'có gói không'), check if any related package exists using flexible matching and return "Có, gói khám '[package name]' có trong hệ thống" if found, or "Không, gói khám không có trong hệ thống" if not found.

Examples (for guidance):
- Question: "Liệt kê các gói khám nội soi dạ dày mà bạn có"
  - Thought: Query 'health_check_packages' with LIKE '%nội soi dạ dày%'.
  - Result: ["Nội Soi Dạ Dày Không Đau - Endo Clinic", "Nội soi dạ dày/trực tràng/đại tràng - Bệnh viện Bảo Sơn"]
  - Answer: "Chào bạn, thật vui được giúp đỡ! Dưới đây là danh sách các gói khám phù hợp:: Nội Soi Dạ Dày Không Đau - Endo Clinic, Nội soi dạ dày/trực tràng/đại tràng - Bệnh viện Bảo Sơn"

- Question: "Liệt kê các gói khám Phẫu thuật bao quy đầu mà bạn có"
  - Thought: Query 'health_check_packages' with LIKE '%Phẫu thuật%bao quy đầu%' OR '%cắt bao quy đầu%'.
  - Result: ["Phẫu thuật cắt bao quy đầu - Bệnh viện A", "Phẫu thuật cắt bao quy đầu - Phòng khám B"]
  - Answer: "Chào bạn, thật vui được giúp đỡ! Dưới đây là danh sách các gói khám phù hợp:: Phẫu thuật cắt bao quy đầu - Bệnh viện A, Phẫu thuật cắt bao quy đầu - Phòng khám B"

- Question: "Bạn có gói khám Phẫu thuật bao quy đầu không?"
  - Thought: Query 'health_check_packages' with LIKE '%Phẫu thuật%bao quy đầu%' OR '%cắt bao quy đầu%'.
  - Result: ["Phẫu thuật cắt bao quy đầu - Bệnh viện A"]
  - Answer: "Chào bạn, thật vui được giúp đỡ! Chúng tôi có gói khám 'Phẫu thuật cắt bao quy đầu - Bệnh viện A' có trong hệ thống."

- Question: "Bạn có gói khám X quang không?"
  - Thought: Query 'health_check_packages' with LIKE '%X quang%'.
  - Result: []
  - Answer: "Chào bạn, thật vui được giúp đỡ! Chúng tôi không tìm thấy gói khám phù hợp với yêu cầu của bạn."
"""

# Tạo toolkit từ SQLDatabase
toolkit = SQLDatabaseToolkit(db=db, llm=llm)

# Tạo agent
agent = create_sql_agent(
    llm=llm,
    toolkit=toolkit,  # Sử dụng toolkit thay vì SQLDatabase trực tiếp
    verbose=True,
    prefix=custom_prefix,
    memory=memory,
    top_k=10,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    agent_executor_kwargs={
        "return_intermediate_steps": True,
        "handle_parsing_errors": True,  # Add this to handle parsing errors
    },
).with_types(input_type=AgentInput)

# Function để test agent và log
def test_agent(input_text):
    logger.info(f"Received input: {input_text}")
    try:
        response = agent.invoke({"input": input_text})
        logger.info(f"Agent response: {response}")
        return response
    except Exception as e:
        logger.error(f"Agent error: {e}")
        print(f"Error: {e}")
        return f"Lỗi: {e}"

# Test standalone
if __name__ == "__main__":
    test_agent("Tôi muốn tìm tất cả các gói khám Phẫu thuật bao quy đầu")