from sqlalchemy import Column, ForeignKey, BigInteger, String, Boolean
from database import Base

class QuizChoice(Base):
    """クイズの選択肢データを保存するモデル"""
    __tablename__ = "quiz_choices"

    id = Column(BigInteger, primary_key=True, index=True)
    quiz_id = Column(BigInteger, ForeignKey("quizzes.id", ondelete="CASCADE"), nullable=False, comment="クイズ")
    choice = Column(String(255), nullable=False, comment="選択肢")
    is_answer = Column(Boolean, nullable=False, comment="正解の選択肢かどうか")
