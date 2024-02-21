from fastapi import APIRouter
from .pelmanism import pelmanism_router

# ルーティングインスタンスの生成
router = APIRouter()

# サブディレクトリのルーティングを読み込み
router.include_router(pelmanism_router)
