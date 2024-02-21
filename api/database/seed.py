from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .db import DB_URL, Base

class Seeder:
    """シードデータを挿入するクラス

    Attributes:
        session (sessionmaker): DB セッション
    """

    def __init__(self):
        """コンストラクタ

        DB セッションを作成する
        """
        engine = create_engine(DB_URL)
        self.session = sessionmaker(bind=engine)

    def handle(self, seeds: list[Base]) -> None:
        """シードデータを挿入する

        指定された全てのシードデータを挿入する

        Args:
            seeds (list[Base]): シードデータ
        """
        with self.session() as db:
            for seed in seeds:
                db.add(seed)
            db.commit()

# poetry run python -m database.seed
if __name__ == "__main__":
    Seeder().handle([
        # シードデータを指定する
    ])
