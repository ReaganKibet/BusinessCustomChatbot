from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
import datetime

Base = declarative_base()

class ChatHistory(Base):
    __tablename__ = "chat_history"
    id = Column(Integer, primary_key=True, index=True)
    user_query = Column(Text, nullable=False)
    bot_response = Column(Text, nullable=False)
    success = Column(Boolean, default=True)
    error_message = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    role = Column(String, default="user")