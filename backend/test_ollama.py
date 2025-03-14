import ollama
import logging

def test_generate_response(prompt):
    try:
        response = ollama.chat(model="llama2", messages=[{"role": "user", "content": prompt}])
        print(response["message"])
    except Exception as e:
        logging.error(f"Error generating response: {str(e)}")
        print(f"Error generating response: {str(e)}")

if __name__ == "__main__":
    test_generate_response("Hello chatbot!")