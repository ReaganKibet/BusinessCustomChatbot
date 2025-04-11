from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
import logging
import ollama
from database import SessionLocal
from services.logging_service import chat_logger
from functools import lru_cache
import asyncio
from typing import Dict, Any
from cachetools import TTLCache

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

# Add this function before the route handler
async def check_connection() -> Dict[str, Any]:
    for attempt in range(3):
        try:
            return get_available_models()
        except Exception:
            if attempt < 2:
                await asyncio.sleep(0.5)  # Reduced sleep time
            continue
    raise HTTPException(status_code=503, detail="Service unavailable")

# Initialize cache at module level
response_cache = TTLCache(maxsize=100, ttl=3600)

@router.post("")
async def chat(chat_input: ChatInput, db: Session = Depends(get_db)):
    try:
        # Check cache first
        cache_key = chat_input.message.strip().lower()
        if cache_key in response_cache:
            return {"response": response_cache[cache_key]}

        await check_connection()

        try:
            # Use non-streaming response for simplicity
            response = await asyncio.wait_for(
                asyncio.to_thread(
                    ollama.chat,
                    model="mistral:7b-instruct",
                    messages=[{
                        "role": "system",
                        "content": "You are a restaurant AI. Be concise."
                    }, {
                        "role": "user",
                        "content": chat_input.message
                    }],
                    options={
                        "temperature": 0.3,
                        "num_ctx": 256,
                        "num_thread": 1,
                        "num_predict": 50
                    }
                ),
                timeout=30.0
            )
            
            formatted_response = format_menu_response(response)
            response_cache[cache_key] = formatted_response
            
            # Log success
            chat_logger.log_chat(db=db, 
                               query=chat_input.message,
                               response=formatted_response, 
                               success=True)
            
            return {"response": formatted_response}
            
        except asyncio.TimeoutError:
            raise HTTPException(status_code=504, detail="Request timed out")
            
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
