import logging
import os

def setup_logging():
    log_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs')
    os.makedirs(log_dir, exist_ok=True)
    
    # Technical logs
    logging.basicConfig(
        filename=os.path.join(log_dir, 'technical.log'),
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )
    
    # Response logs
    response_logger = logging.getLogger('response_logger')
    response_handler = logging.FileHandler(os.path.join(log_dir, 'responses.log'))
    response_handler.setFormatter(logging.Formatter('%(asctime)s - %(message)s'))
    response_logger.addHandler(response_handler)
    
    return response_logger