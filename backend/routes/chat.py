from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
import logging
import ollama
from database import SessionLocal
from services.logging_service import chat_logger
from functools import lru_cache

router = APIRouter()

class ChatInput(BaseModel):
    message: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Cache the model list to avoid repeated checks
@lru_cache(maxsize=1)
def get_available_models():
    return ollama.list()

def format_menu_response(raw_response: str) -> str:
    """Clean and format the menu response for better readability."""
    # Remove any model metadata or technical information
    if isinstance(raw_response, dict):
        content = raw_response.get('message', {}).get('content', '')
    else:
        content = str(raw_response)
    
    # Clean up formatting
    formatted = (
        content
        .replace('*', '•')
        .replace('($', ' ($')
        .replace('\t+', '  •')  # Convert tabbed items to bullet points
        .strip()
    )
    
    # Ensure consistent spacing
    sections = formatted.split('\n\n')
    cleaned_sections = [section.strip() for section in sections if section.strip()]
    
    return '\n\n'.join(cleaned_sections)

@router.post("")
async def chat(chat_input: ChatInput, db: Session = Depends(get_db)):
    try:
        response = ollama.chat(
            model="llama2",
            messages=[{
                "role": "system",
                "content": """You are a restaurant AI assistant. Format responses as follows:
                    MENU SECTIONS: Use clear headings in bold
                    ITEMS: Use clean bullet points (•)
                    PRICES: Show in parentheses
                    SPACING: Add line breaks between sections"""
            }, {
                "role": "user",
                "content": chat_input.message
            }],
            options={
                "temperature": 0.7,
                "num_ctx": 2048
            }
        )
        
        # Extract only the message content
        if isinstance(response, dict) and 'message' in response:
            raw_response = response['message'].get('content', '')
        else:
            raw_response = str(response)
        
        # Clean and format the response
        formatted_response = (
            raw_response
            .replace('*', '•')
            .replace('($', ' ($')
            .strip()
        )
        
        # Log to separate file
        logging.basicConfig(
            filename='chat_logs.txt',
            level=logging.INFO,
            format='%(asctime)s - %(message)s'
        )
        logging.info(f"Raw response: {response}")
        
        # Database logging
        chat_logger.log_chat(
            db=db,
            query=chat_input.message,
            response=formatted_response,
            success=True
        )
        
        # Return only the cleaned response
        return {"response": formatted_response}
        
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Unable to process request")
