from pydantic import BaseModel, Field, field_validator

class BokeEvaluationRequest(BaseModel):
    """リクエストされたボケ（最大4個まで）"""
    bokes: list[str] = Field(
        ...,
        max_length=4,
        description="順位を判断するボケの配列。最大4つまで",
        example=[
            "魚が空を飛ぶことができるか？いいえ、彼らは「飛び魚」ではありません。",
            "ゴリラが何を言ったら人々が笑うか？「バナナ！」",
            "豚が運転することができるか？いいえ、彼らは運転免許を持っていない。",
            "チーズがすべり台を滑ると、何が起こるか？「チーズが溶ける！」"
        ]
    )

    @field_validator("bokes")
    def validate_bokes(cls, bokes: list[str]):
        """ボケの検証を行う

        ボケの文字長が 255 文字を超えた場合にはバリデーションエラーをスローする

        Args:
            bokes (list[str]): リクエストされたボケ（最大4個まで）

        Returns:
            list[str]

        Raises:
            ValueError: ボケの文字長が 255 文字を超えた場合
        """
        for boke in bokes:
            if len(boke) > 255:
                raise ValueError("Please make a Kansai-ben blur in 255 characters or less.")
        return bokes

class BokeEvaluationResponse(BaseModel):
    """GPT によって判定したボケのランキング"""
    ranks: dict[str|int, str|int] = Field(
        ...,
        max_length=4,
        description="順位をキーとして何人目のボケかを値とする辞書型オブジェクトを返却する",
        example={
            "1": "2",
            "2": "1",
            "3": "3",
            "4": "4",
        }
    )

    @field_validator("ranks")
    def validate_rank(cls, ranks: dict[str|int, str|int]):
        """順位付けしたボケの検証を行う

        順位とボケがそれぞれ数字か数字に変換できる文字列であるか検証する
        どちらかが数字に変換できなかった場合はバリデーションエラーをスローする

        Args:
            ranks (dict[str|int, str|int]): 順位付けされたボケ

        Returns:
            dict[str|int, str|int]

        Raises:
            ValueError: 順位かボケの内、数値に変換できない値が1つでもあった場合
        """
        for rank, boke in ranks.items():
            int(rank)
            int(boke)
        return ranks
