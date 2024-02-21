from sqlalchemy import create_engine
from . import DB_URL, Base
from models import *
import sys

class Migrate:
    """マイグレーションを行うクラス

    Attributes:
        engine (create_engine): DB 接続エンジン
    """

    def __init__(self):
        """コンストラクタ

        DB 接続エンジンを作成する
        """
        self.engine = create_engine(DB_URL)

    def handle(self, tables: list[Base], option: str = None) -> None:
        """マイグレーションを実行する

        指定されたテーブルを作成またはリセットする
        作成する場合はテーブルが存在しない場合のみ作成する
        リセットする場合はテーブルを削除してから作成する

        Args:
            tables (list[Base]): マイグレーション対象のテーブル
            option (str, None): マイグレーションオプション
        """
        match option:
            case "reset":
                self.reset_database(tables)
            case None:
                self.create_tables(tables)

    def create_tables(self, tables: list[Base]) -> None:
        """テーブルを作成する

        指定されたテーブルが存在しない場合のみ作成する

        Args:
            tables (list[Base]): 作成対象のテーブル
        """
        [table.metadata.create_all(bind=self.engine) for table in tables]

    def reset_database(self, tables: list[Base]) -> None:
        """データベースをリセットする

        指定されたすべてのテーブルを削除してから作成する

        Args:
            tables (list[Base]): リセット対象のテーブル
        """
        [self.reset_table(table) for table in tables]

    def reset_table(self, table: Base) -> None:
        """テーブルをリセットする

        指定されたテーブルを削除してから作成する

        Args:
            table (Base): リセット対象のテーブル
        """
        table.metadata.drop_all(bind=self.engine)
        table.metadata.create_all(bind=self.engine)

# poetry run python -m database.migrate [option]
if __name__ == "__main__":
    Migrate().handle(
        [
            # マイグレーション対象のテーブルを配列で指定する
            Pelmanism,
        ],
        sys.argv[1] if len(sys.argv) > 1 else None
    )
