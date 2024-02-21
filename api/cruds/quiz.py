from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models import Prefecture as PrefectureModel, Quiz as QuizModel, QuizChoice as QuizChoiceModel
from schemas import Quiz as QuizSchema

async def read(db: AsyncSession) -> list[QuizSchema]:
    """クイズ関連のデータを加工して返却する

    都道府県・クイズ・選択肢テーブルからデータを取得 結合する
    結合したデータを1問あたり1つの辞書型オブジェクトにまとめる

    Args:
        db (AsyncSession): DBセッション

    Returns:
        list[QuizSchema]: クイズのスキーマ配列を返却する
    """
    result = await db.execute(
        select(QuizModel, PrefectureModel.name, QuizChoiceModel.choice, QuizChoiceModel.is_answer)
        .join(PrefectureModel)
        .join(QuizChoiceModel)
        .order_by(QuizModel.id)
    )

    response = {}
    for (item, prefecture, choice, is_answer) in result.all():
        if item.id not in response:
            response[item.id] = {
                "id": item.id,
                "prefecture": prefecture,
                "place": item.place,
                "quiz": item.quiz,
                "answer": "",
                "choices": [],
            }

        if is_answer:
            response[item.id]["answer"] = choice

        response[item.id]["choices"].append(choice)

    return list(response.values())
