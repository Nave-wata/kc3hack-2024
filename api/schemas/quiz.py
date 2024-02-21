from pydantic import BaseModel, Field

class Quiz(BaseModel):
    """クイズのデータスキーマ"""
    id: int = Field(None, example=1)
    prefecture_id: int = Field(
        None,
        description="",
        example="1",
    )
    place: str = Field(
        None,
        description="クイズのお題となる場所",
        example="USJ",
    )
    quiz: str = Field(
        None,
        description="問題",
        example="USJ (ユニバーサル・スタジオ・ジャパン) はどの都市にありますか？",
    )

    class Config:
        orm_mode = True
        from_attributes=True
