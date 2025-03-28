import logging
import os
from datetime import datetime
from sqlalchemy.orm import Session
from models import ChatHistory

class ChatLogger:
    def __init__(self):
        # Create logs directory if it doesn't exist
        log_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs')
        os.makedirs(log_dir, exist_ok=True)
        
        log_file = os.path.join(log_dir, f'chat_logs_{datetime.now().strftime("%Y%m%d")}.log')
        
        logging.basicConfig(
            filename=log_file,
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        
    def log_chat(self, db: Session, query: str, response: str, success: bool = True, error: str = None):
        try:
            chat_record = ChatHistory(
                user_query=query,
                bot_response=response,
                success=success,
                error_message=error
            )
            db.add(chat_record)
            db.commit()
            
            if not success:
                logging.error(f"Chat Error - Query: {query} - Error: {error}")
            else:
                logging.info(f"Chat Success - Query: {query}")
                
        except Exception as e:
            logging.error(f"Logging Error: {str(e)}")
            db.rollback()

chat_logger = ChatLogger()