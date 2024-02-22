from sqlalchemy import Column, BigInteger, Text, Boolean
from database import Base

class Boke(Base):
    """ボケ Bot のボケを保存するモデル"""
    __tablename__ = "bokes"

    id = Column(BigInteger, primary_key=True, index=True)
    text = Column(Text, nullable=False, comment="文章")
    boke = Column(Boolean, nullable=False, comment="文章がボケかどうか")
