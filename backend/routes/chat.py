from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from services.chatbot import generate_response
from models import ChatHistory
import logging

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def chat(user_input: dict, db: Session = Depends(get_db)):
    user_message = user_input.get("message")
    if not user_message:
        logging.error("No message provided")
        return {"error": "No message provided"}
    
    bot_reply = generate_response(user_message)
    if bot_reply.startswith("Error"):
        logging.error(bot_reply)
        return {"error": bot_reply}
    
    try:
        chat_entry = ChatHistory(user_query=user_message, bot_response=bot_reply)
        db.add(chat_entry)
        db.commit()
    except Exception as e:
        logging.error(f"Error saving chat history: {str(e)}")
        return {"error": f"Error saving chat history: {str(e)}"}
    
    return {"response": bot_reply}
