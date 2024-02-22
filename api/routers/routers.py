from fastapi import APIRouter
from .pelmanism import pelmanism_router
from .boke_evaluation import boke_evaluation_router

# ルーティングインスタンスの生成
router = APIRouter()

# サブディレクトリのルーティングを読み込み
router.include_router(pelmanism_router)
router.include_router(boke_evaluation_router)
