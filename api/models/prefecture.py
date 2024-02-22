from sqlalchemy import Column, BigInteger, String
from sqlalchemy.orm import relationship
from database import Base
from .quiz import Quiz

class Prefecture(Base):
    """都道府県データを保存するモデル"""
    __tablename__ = "prefectures"

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True, comment="都道府県名")

    quiz = relationship("Quiz", backref="prefectures", cascade="all")
