from pydantic import BaseModel, Field

class QuizChoice(BaseModel):
    """クイズの選択肢のデータスキーマ"""
    id: int = Field(None, example=1)
    quiz_id: int = Field(
        None,
        description="対象のクイズID",
        example="1",
    )
    choice: str = Field(
        None,
        description="選択肢",
        example="大阪",
    )
    is_answer: bool = Field(
        None,
        description="選択肢が正解かどうか",
        example=True,
    )

    class Config:
        orm_mode = True
        from_attributes=True
