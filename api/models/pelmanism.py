from sqlalchemy import Column, BigInteger, String
from database import Base

class Pelmanism(Base):
    """神経衰弱ゲームの対応データを保存するモデル"""
    __tablename__ = "pelmanism"

    id = Column(BigInteger, primary_key=True, index=True)
    kansai = Column(String(255), nullable=False, comment="関西弁")
    default = Column(String(255), nullable=False, comment="標準語")
