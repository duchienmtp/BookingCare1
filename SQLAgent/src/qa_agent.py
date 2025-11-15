import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.memory import ConversationSummaryMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.prompts import PromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_pinecone import PineconeVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain_community.document_loaders import PyPDFLoader
import logging
from pinecone import Pinecone, ServerlessSpec
from concurrent.futures import ThreadPoolExecutor

load_dotenv()

# Cấu hình logging
logging.basicConfig(
    filename='qa_logs.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Khởi tạo client Pinecone
pinecone_api_key = os.getenv("PINECONE_API_KEY")
pinecone_index_name = os.getenv("PINECONE_INDEX_NAME")
if not pinecone_api_key or not pinecone_index_name:
    raise ValueError("Missing PINECONE_API_KEY or PINECONE_INDEX_NAME in .env")

pc = Pinecone(api_key=pinecone_api_key)
embedding_model = "sentence-transformers/all-MiniLM-L6-v2"
embeddings = HuggingFaceEmbeddings(model_name=embedding_model)
dimension = 768 

# Kiểm tra và tạo/reconfigure index
if pc.has_index(pinecone_index_name):
    index = pc.Index(pinecone_index_name)
    index_desc = pc.describe_index(pinecone_index_name)
    if index_desc.dimension != dimension:
        pc.delete_index(pinecone_index_name)
        pc.create_index(
            name=pinecone_index_name,
            dimension=dimension,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1")  # Thay region nếu cần
        )
        logger.info(f"Deleted index {pinecone_index_name} due to dimension mismatch")
    else:
        logger.info(f"Index {pinecone_index_name} exists with correct dimension")
else:
    pc.create_index(
        name=pinecone_index_name,
        dimension=dimension,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")  # Thay region nếu cần
    )
    logger.info(f"Created Pinecone index: {pinecone_index_name}")
index = pc.Index(pinecone_index_name)
logger.info(f"Connected to Pinecone index: {pinecone_index_name}")

# Khởi tạo LLM từ Groq
llm = ChatGroq(
    temperature=0.5,
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.3-70b-versatile"
)

# Memory cho agent
memory = ConversationSummaryMemory(llm=llm, memory_key="chat_history")

# Embeddings từ Hugging Face
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/paraphrase-multilingual-mpnet-base-v2"
)

# Kết nối Pinecone Vector Store
vector_store = PineconeVectorStore(index_name=pinecone_index_name, embedding=embeddings)

# Hàm để load và embed dữ liệu từ một file PDF
def load_single_pdf(pdf_path):
    try:
        loader = PyPDFLoader(pdf_path)
        documents = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        texts = text_splitter.split_documents(documents)
        vector_store.add_documents(texts)
        logger.info(f"Data from {pdf_path} loaded to Pinecone")
    except Exception as e:
        logger.error(f"Error loading {pdf_path}: {e}")

# Hàm để load nhiều file PDF cùng lúc
def load_multiple_pdfs(pdf_paths):
    with ThreadPoolExecutor(max_workers=4) as executor:
        executor.map(load_single_pdf, pdf_paths)
    logger.info("All PDFs processed and loaded to Pinecone")

# Prompt tùy chỉnh cho QA, ép buộc tiếng Việt
qa_prompt = PromptTemplate(
    template="""Bạn là một trợ lý y tế. 
Trả lời câu hỏi của người dùng bằng TIẾNG VIỆT, chi tiết và dễ hiểu, dựa trên thông tin trong tài liệu. 
Nếu không chắc chắn, hãy khuyên người dùng tham khảo ý kiến bác sĩ.

Ngữ cảnh từ tài liệu:
{context}

Câu hỏi: {question}

Trả lời:""",
    input_variables=["context", "question"]
)

# QA Chain với RAG
retriever = vector_store.as_retriever(search_kwargs={"k": 8})

qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    memory=ConversationSummaryMemory(llm=llm, memory_key="chat_history"),
    combine_docs_chain_kwargs={"prompt": qa_prompt},
    verbose=False
)

# Function để test QA agent
def test_qa_agent(input_text, chat_history=None):
    logger.info(f"User query: {input_text}")
    try:
        # If no chat_history is provided, use the existing memory
        if chat_history is None:
            response = qa_chain.invoke({"question": input_text})
        else:
            # If chat_history is provided, use it for this query only
            response = qa_chain.invoke({"question": input_text, "chat_history": chat_history})
        
        answer = response.get("answer", "Xin lỗi, tôi không thể tìm thấy câu trả lời phù hợp.")
        logger.info(f"Generated answer: {answer}")
        return answer
    except Exception as e:
        error_msg = f"Lỗi khi xử lý câu hỏi: {str(e)}"
        logger.error(error_msg)
        return error_msg

# Test standalone
if __name__ == "__main__":

    # # Get the directory of the current script
    # script_dir = os.path.dirname(os.path.abspath(__file__))
    # # Create the full path to the assets directory
    # assets_dir = os.path.join(script_dir, 'assets')
    # # Get all PDF files in the assets directory
    # pdf_paths = [os.path.join(assets_dir, f) for f in os.listdir(assets_dir) 
    #             if f.lower().endswith('.pdf')]
    # load_multiple_pdfs(pdf_paths)

    test_qa_agent("Nguyên nhân gây ra bệnh béo phì ?")