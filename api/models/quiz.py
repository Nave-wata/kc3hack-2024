from sqlalchemy import Column, ForeignKey, BigInteger, String, Text
from sqlalchemy.orm import relationship
from database import Base
from .quiz_choice import QuizChoice

class Quiz(Base):
    """クイズデータを保存するモデル"""
    __tablename__ = "quizzes"

    id = Column(BigInteger, primary_key=True, index=True)
    prefecture_id = Column(BigInteger, ForeignKey("prefectures.id", ondelete="CASCADE"), nullable=False, comment="都道府県")
    place = Column(String(255), nullable=False, comment="クイズのお題となる場所")
    quiz = Column(Text, nullable=False, comment="クイズ")

    quiz_choice = relationship("QuizChoice", backref="quizzes", cascade="all")
