from pydantic import BaseModel, Field

class Quiz(BaseModel):
    """クイズのデータスキーマ"""
    id: int = Field(None, example=1)
    prefecture: str = Field(
        None,
        description="都道府県名",
        example="大阪",
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
    answer: str = Field(
        None,
        description="答え",
        example="大阪",
    )
    choices: list[str] = Field(
        None,
        description="選択肢",
        example= [
            "東京",
            "大阪",
            "京都",
            "福岡",
        ]
    )

    class Config:
        orm_mode = True
        from_attributes=True
