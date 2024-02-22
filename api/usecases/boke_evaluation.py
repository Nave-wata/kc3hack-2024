from services.openai import OpenAIClient
import json

def evaluate_boke(bokes: list[str]) -> dict[str|int, str|int]:
    """渡されたボケを面白い順に順位付けして返却する

    渡されたボケを入力として OpenAI API を利用して順位付けを行う
    順位をキー、ボケを値とした json データを返却する

    Args:
        bokes list[str]: ボケ

    Returns:
        dict[str|int, str|int]: 結果を json 形式に変換して返却する

    Raises:
        ValueError: 結果が json 形式のデータでなかった場合
    """
    openai_client = OpenAIClient()
    keys = ["1st", "2nd", "3rd", "4th"]
    dictionary = dict(zip(keys, bokes))
    user_content = json.dumps(dictionary)

    response = openai_client.handle(
        system="""
        あなたはお笑いコンテストの審査員の一人です。出場者は関西弁でボケを披露します。
        関西弁が活かされているか、オリジナリティがあるか、を基準にどの順番でボケが面白いかを審査してください。
        ｛"1":"2","2":"3","3":"1","4":"4"｝のように、順位をキー、何人目のボケかを値とするJSON形式で答えなさい。各順位の理由は答えないでください。"
        """,
        user=user_content,
    )

    return json.loads(response)
