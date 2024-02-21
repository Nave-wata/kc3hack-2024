from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from schemas import Pelmanism as PelmanismSchema
from cruds import pelmanism
from database import async_db

# 神経衰弱ゲーム関連ルーティング
router = APIRouter(prefix="/pelmanism")

@router.get("/", response_model=list[PelmanismSchema])
async def index(db: AsyncSession = Depends(async_db)) -> list[PelmanismSchema]:
    """神経衰弱ゲームの対応データを全件取得

    関西弁に対応する標準語のデータを全て取得する

    Args:
        db (AsyncSession): DBセッション

    Returns:
        list[PelmanismSchema]: 神経衰弱スキーマの配列を json で返却する
    """
    return await pelmanism.read(db)
