from pydantic import BaseModel, Field

class Pelmanism(BaseModel):
    """神経衰弱ゲームの対応データスキーマ"""
    id: int = Field(None, example=1)
    kansai: str = Field(
        None,
        description="標準語に対応する関西弁のテキスト",
        example="なんでやねん"
    )
    default: str = Field(
        None,
        description="関西弁に対応する標準語のテキスト",
        example="どうしてですか"
    )

    class Config:
        orm_mode = True
        from_attributes=True
