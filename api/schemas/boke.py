from pydantic import BaseModel, Field

class Boke(BaseModel):
    """ボケ Bot データのスキーマ"""
    id: int = Field(None, example=1)
    text: str = Field(
        None,
        description="ボケたかボケてないかを判断するテキスト",
        example="魚が空を飛ぶことができるか？いいえ、彼らは「飛び魚」ではありません。",
    )
    boke: bool = Field(
        None,
        description="テキストがボケているかどうか",
        example=True,
    )
