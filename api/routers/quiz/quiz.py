from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import async_db
from schemas import Quiz as QuizSchema
from cruds import quiz

# クイズ関連ルーティング
router = APIRouter(prefix="/quiz")

@router.get("/", response_model=list[QuizSchema])
async def index(db: AsyncSession = Depends(async_db)) -> list[QuizSchema]:
    """クイズ関連のデータを加工して取得する

    Args:
        db (AsyncSession): DBセッション

    Returns:
        list[QuizSchema]: クイズのスキーマ配列を json で返却する
    """
    return await quiz.read(db)
