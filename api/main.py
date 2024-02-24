from fastapi import FastAPI
from routers import router
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# .env ファイルの読み込み
load_dotenv()

# アプリケーションインスタンスを生成
if os.getenv("APP_ENV") != "production":
    app = FastAPI()
else:
    app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

# ルーティングの読み込み
app.include_router(router)

# ミドルウェアの追加
app.add_middleware(
    CORSMiddleware,
    # アクセスを許可するオリジン
    allow_origins=[os.getenv("APP_ORIGIN")],
    # 全てのリクエストメソッドを許可(["GET", "POST"]など個別指定も可能)
    allow_methods=["*"],
    # アクセス可能なレスポンスヘッダーを設定（今回は必要ない）
    allow_headers=["*"],
)
