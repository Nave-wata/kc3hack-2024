from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

# .env ファイルを読み込む
load_dotenv()

# DB 接続URLのフォーマット
DB_URL_FORMAT = "{type}+{driver}://{user}:{password}@{host}:{port}/{database}?charset=utf8mb4"

# DB 非同期接続URL
ASYNC_DB_URL = DB_URL_FORMAT.format(
    type=os.getenv("DB_TYPE"),
    driver="aiomysql",
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASS"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    database=os.getenv("DB_NAME"),
)

# DB 同期接続URL
DB_URL = DB_URL_FORMAT.format(
    type=os.getenv("DB_TYPE"),
    driver="pymysql",
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASS"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    database=os.getenv("DB_NAME"),
)

# モデルのベースクラス
Base = declarative_base()

async def async_db():
    """非同期DBセッションを返す

    Yields:
        AsyncSession: 非同期DBセッション
    """
    async_engine = create_async_engine(ASYNC_DB_URL, echo=True)
    async_session = sessionmaker(autocommit=False, autoflush=False, bind=async_engine, class_=AsyncSession)

    async with async_session() as session:
        yield session
