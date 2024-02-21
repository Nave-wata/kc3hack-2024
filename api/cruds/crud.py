from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel as Schema
from database import Base as Model

async def read(db: AsyncSession, model: Model, schema: Schema) -> list[Schema]:
    """全件取得処理

    指定されたモデルのデータを全件取得する
    取得したデータをスキーマの配列型（Python プリミティブ型に変換）に変換して返却する

    Args:
        db (AsyncSession): DB セッション
        model (Model): モデル
        schema (Schema): スキーマ

    Returns:
        list[Schema] テーブルから取り出したデータをスキーマの配列型に変換して返却する
    """
    result = await db.execute(select(model))
    return [schema.from_orm(item) for item in result.scalars().all()]
