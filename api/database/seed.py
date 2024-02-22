from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
from . import DB_URL, Base
from models import *

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

        Boke(id=1, text="魚が空を飛ぶことができるか？いいえ、彼らは「飛び魚」ではありません。", boke=True),
        Boke(id=2, text="ゴリラが何を言ったら人々が笑うか？「バナナ！」", boke=True),
        Boke(id=3, text="豚が運転することができるか？いいえ、彼らは運転免許を持っていない。", boke=True),
        Boke(id=4, text="チーズがすべり台を滑ると、何が起こるか？「チーズが溶ける！」", boke=True),
        Boke(id=5, text="ライオンが携帯電話を使うと何が起こるか？「モバイルローミング！」", boke=True),
        Boke(id=6, text="ドアがガムを噛んだらどうなるか？「ドアがへこんでしまう！」", boke=True),
        Boke(id=7, text="クマが何でパンを切るか？「ベアハンズで！」", boke=True),
        Boke(id=8, text="バッタがバーに入ったらどうなるか？「ホップする！」", boke=True),
        Boke(id=9, text="ウサギがレースに参加したら何をするか？「ウサギのように速く走る！」", boke=True),
        Boke(id=10, text="ゾウが車に乗ったらどうなるか？「車がへこむ！」", boke=True),
        Boke(id=11, text="カエルが何を食べたら驚くか？「リボーンズ（再生）チキン！」", boke=True),
        Boke(id=12, text="ミツバチが何を言ったら怒られるか？「ブズブズ言うな！」", boke=True),
        Boke(id=13, text="ドレスが突然話し始めたらどうするか？「ドレスが話すなんて、服務拒否！」", boke=True),
        Boke(id=14, text="ピーナッツがレースに出たらどうなるか？「シェルを剥がす！」", boke=True),
        Boke(id=15, text="カメがスポーツカーに乗ったらどうなるか？「遅いアクセル！」", boke=True),
        Boke(id=16, text="ネコが何を飲んだら元気になるか？「ミルク！」", boke=False),
        Boke(id=17, text="サメが何を食べたら満足するか？「シール（アザラシ）！」", boke=False),
        Boke(id=18, text="パンダが何をするとかわいく見えるか？「バンブーを食べる！」", boke=False),
        Boke(id=19, text="ペンギンが何をすると楽しそうに見えるか？「スライドする！」", boke=False),
        Boke(id=20, text="カラスが何をすると賢く見えるか？「カラカラと笑う！」", boke=False),
        Boke(id=21, text="ヘビが何をすると怖く見えるか？「シュルシュルと這う！」", boke=False),
        Boke(id=22, text="キツネが何をすると悪賢く見えるか？「キツネ目をする！」", boke=False),
        Boke(id=23, text="カメレオンが何をすると目立たなくなるか？「色を変える！」", boke=False),
        Boke(id=24, text="カブトムシが何をすると強そうに見えるか？「角を出す！」", boke=False),
        Boke(id=25, text="ハムスターが何をするとおもしろく見えるか？「回し車を回す！」", boke=False),
        Boke(id=26, text="サルが何をするとおもしろく見えるか？「モンキービジネスをする！」", boke=False),
        Boke(id=27, text="クジラが何をするとすごく見えるか？「シャワーをする！」", boke=False),
        Boke(id=28, text="フクロウが何をすると賢く見えるか？「フクロウと言う！」", boke=False),
        Boke(id=29, text="ネズミが何をするとかわいく見えるか？「チーズを食べる！」", boke=False),
        Boke(id=30, text="カエルが何をすると幸せに見えるか？「カエルの王子様にキスする！」", boke=False),
    ])
