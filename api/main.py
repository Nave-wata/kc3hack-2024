from fastapi import FastAPI
from routers import router

# アプリケーションインスタンスを生成
app = FastAPI()

# ルーティングの読み込み
app.include_router(router)
