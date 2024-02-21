from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
from . import DB_URL, Base
from models import Pelmanism

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
        プライマリーキーを指定したデータを指定することで重複データを防ぐことが可能

        Args:
            seeds (list[Base]): シードデータ
        """
        with self.session() as db:
            for seed in seeds:
                try:
                    db.add(seed)
                    db.commit()
                except IntegrityError:
                    db.rollback()

# poetry run python -m database.seed
if __name__ == "__main__":
    Seeder().handle([
        # シードデータを指定する
        Pelmanism(id=1, kansai="しんどい", default="疲れた"),
        Pelmanism(id=2, kansai="なおす", default="整理する、戻す、修理する"),
        Pelmanism(id=3, kansai="さら", default="新しい"),
        Pelmanism(id=4, kansai="シュッとしてる", default="ちゃんとしている、かっこよく見える"),
        Pelmanism(id=5, kansai="はよ", default="早く"),
        Pelmanism(id=6, kansai="ほんま", default="本当"),
        Pelmanism(id=7, kansai="おもろい", default="おもしろい"),
        Pelmanism(id=8, kansai="あかん", default="ダメ"),
        Pelmanism(id=9, kansai="ちゃう", default="違う"),
        Pelmanism(id=10, kansai="ほな", default="じゃあ、さて"),
        Pelmanism(id=11, kansai="めっちゃ", default="すごく、とても"),
        Pelmanism(id=12, kansai="せやねん", default="そうなんです"),
        Pelmanism(id=13, kansai="しゃあない", default="しょうがない、仕方ない"),
        Pelmanism(id=14, kansai="かめへん", default="構わない"),
        Pelmanism(id=15, kansai="でけへん", default="できない"),
        Pelmanism(id=16, kansai="やんな", default="そうだよね"),
        Pelmanism(id=17, kansai="どない", default="それはどうなの"),
        Pelmanism(id=18, kansai="そやかて", default="そうは言っても"),
        Pelmanism(id=19, kansai="うち", default="私"),
        Pelmanism(id=20, kansai="ほかす", default="捨てる"),
        Pelmanism(id=21, kansai="いけず", default="意地悪"),
        Pelmanism(id=22, kansai="さぶいぼ", default="鳥肌"),
        Pelmanism(id=23, kansai="かなん", default="無理、勝てる余地はない"),
    ])
