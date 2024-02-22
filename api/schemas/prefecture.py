from pydantic import BaseModel, Field

class Prefecture(BaseModel):
    """都道府県のデータスキーマ"""
    id: int = Field(None, example=1)
    name: str = Field(
        None,
        description="都道府県名",
        example="大阪",
    )

    class Config:
        orm_mode = True
        from_attributes=True
