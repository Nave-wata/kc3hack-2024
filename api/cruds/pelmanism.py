from sqlalchemy.ext.asyncio import AsyncSession
from models import Pelmanism as PelmanismModel
from schemas import Pelmanism as PelmanismSchema
from .crud import read as base_read

async def read(db: AsyncSession) -> list[PelmanismSchema]:
    """神経衰弱ゲームの対応データを全件取得

    関西弁に対応する標準語のデータを全て取得する

    Args:
        db (AsyncSession): DBセッション

    Returns:
        list[PelmanismSchema]
    """
    return await base_read(db, PelmanismModel, PelmanismSchema)
