import logging
import ollama

def generate_response(prompt):
    try:
        response = ollama.chat(
            model="llama2", 
            messages=[{"role": "user", "content": prompt}]
        )
        
        if not response or "message" not in response:
            raise ValueError("Invalid response from AI model")
            
        return response["message"]["content"]
    except Exception as e:
        logging.error(f"Error generating response: {str(e)}")
        return f"Error: {str(e)}"