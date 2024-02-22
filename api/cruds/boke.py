from sqlalchemy.ext.asyncio import AsyncSession
from models import Boke as BokeModel
from schemas import Boke as BokeSchema
from .crud import read as base_read

async def get_boke(db: AsyncSession) -> list[BokeModel]:
    """ボケ Bot のデータを全件取得

    テキストとそのテキストがボケているものかどうかの情報を全て取得する

    Args:
        db (AsyncSession): DB セッション

    Returns:
        list[BokeModel]:
    """
    return await base_read(db, BokeModel, BokeSchema)
