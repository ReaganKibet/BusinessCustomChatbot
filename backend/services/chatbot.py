import ollama
import logging

def generate_response(prompt):
    messages = [
        {"role": "system", "content": "You are a professional AI assistant for a restaurant business. Your job is to assist customers with menu recommendations, order processing, restaurant policies, and general food-related inquiries. Avoid unrelated topics."},
        {"role": "user", "content": prompt}
    ]
    try:
        # Use the smaller model
       response = ollama.chat(model="mistral", messages=[{"role": "user", "content": prompt}])
       return response["message"]
    except Exception as e:
        logging.error(f"Error generating response: {str(e)}")
        return f"Error generating response: {str(e)}"
