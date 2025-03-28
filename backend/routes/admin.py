from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import ChatHistory
from typing import List
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

# Add get_db dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ChatHistoryResponse(BaseModel):
    id: int
    user_query: str
    bot_response: str
    success: bool
    error_message: str | None
    timestamp: datetime

    class Config:
        from_attributes = True

@router.get("/chat-history", response_model=List[ChatHistoryResponse])
def get_chat_history(db: Session = Depends(get_db)):
    return db.query(ChatHistory).order_by(ChatHistory.timestamp.desc()).all()

@router.get("/error-logs")
def get_error_logs(db: Session = Depends(get_db)):
    return db.query(ChatHistory).filter(ChatHistory.success == False).order_by(ChatHistory.timestamp.desc()).all()
