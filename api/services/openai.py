from openai import OpenAI

class OpenAIClient:
    """OpenAI API をたたくための汎用クラス

    Attributes:
        client (OpenAI): OpenAI client
    """

    def __init__(self):
        """コンストラクタ

        OpenAI クライアントを生成する
        """
        self.client = OpenAI()

    def handle(self, system: str, user: str, assistants: list[str] = None, model: str = "gpt-3.5-turbo-0125", response_format: dict = None) -> str | None:
        """OpenAI API をたたいてレスポンスを返却する

        Args:
            system (str): AI アシスタントの設定
            user (str): ユーザからの入力
            assistants (list[str]|None): 過去の会話など
            model (str): GPT モデル
            response_format (dict): レスポンスのフォーマット

        Returns:
            str|None: GPT からの回答を返却する
        """
        if response_format is None:
            response_format = {"type":"json_object"}

        if assistants is None:
            assistants = []

        response = self.request(system, user, assistants, model, response_format)
        return response.choices[0].message.content

    def request(self, system: str, user: str, assistants: list[str], model: str, response_format: dict):
        """OpenAI API にリクエストを送信する

        渡された値をプロンプトとして加工する
        OpenAI API をたたきレスポンスを返却する

        Args:
            system (str): AI アシスタントの設定
            user (str): ユーザからの入力
            assistants (list[str]|None): 過去の会話など
            model (str): GPT モデル
            response_format (dict): レスポンスのフォーマット

        Returns:
            (ChatCompletion|Stream[ChatCompletionChunk]: レスポンス
        """
        message = [
            {
                "role": "system",
                "content": system,
            },
            {
                "role": "user",
                "content": user,
            },
        ]

        for assistant in assistants:
            message.append({
                "role": "assistant",
                "content": assistant,
            })

        return self.client.chat.completions.create(
            model=model,
            response_format=response_format,
            messages=message
        )
