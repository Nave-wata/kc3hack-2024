from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from schemas import Boke as BokeSchema
from cruds import boke
from database import async_db

# ボケ Bot 関連ルーティング
router = APIRouter(prefix="/boke")

@router.get("/", response_model=list[BokeSchema])
async def get_boke(db: AsyncSession = Depends(async_db)) -> list[BokeSchema]:
    """ボケ Bot のデータを全件取得

    テキストとそのテキストがボケているものかどうかの情報を全て取得する

    Args:
        db (AsyncSession): DB セッション

    Returns:
        list[BokeSchema]: ボケ Bot スキーマの配列を json で返却する
    """
    return await boke.get_boke(db)
