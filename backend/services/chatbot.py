import ollama
import logging
import sys

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def test_ollama_connection():
    """Test if Ollama API is working properly."""
    try:
        logging.info("Testing Ollama connection...")
        ollama.list()
        logging.info(" Ollama service is running")
        test_prompt = "Say 'test successful' if you can read this"
        response = ollama.chat(model="mistral", messages=[
            {"role": "user", "content": test_prompt}
        ])
        logging.info(" Model response received")
        if "message" in response and "content" in response["message"]:
            logging.info(" Response format is correct")
            logging.info("Test response: " + response["message"]["content"][:50] + "...")
            return True
        else:
            logging.error(" Response format is incorrect")
            return False
    except Exception as e:
        logging.error(f" Ollama test failed: {str(e)}")
        return False

def generate_response(prompt):
    """Generate a natural, well-formatted restaurant assistant response."""
    try:
        system_message = """You are a friendly and professional restaurant assistant. Your role is to:
        - Help customers select meals based on dietary needs and preferences.
        - Suggest popular dishes, drinks, and pairings.
        - Provide ingredient details and allergens.
        - Sound natural, like an attentive waiter, while keeping responses engaging and concise.
        """
        messages = [
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]
        
        response = ollama.chat(model="mistral", messages=messages)
        if "message" in response and "content" in response["message"]:
            return response["message"]["content"].strip()
        else:
            return "I'm sorry, I didn't quite get that. Could you rephrase your request?"
    except Exception as e:
        logging.error(f"Error generating response: {str(e)}")
        return "Apologies, but I'm experiencing some issues. Please try again later."

def main():
    print("\n=== Restaurant AI Assistant ===")
    print("Welcome! Ask me about our menu, recommendations, or dietary options!")
    print("Type 'test' to check API connection")
    print("Type 'quit' to exit.\n")
    
    while True:
        try:
            user_input = input("You: ").strip()
            
            if user_input.lower() == 'quit':
                print("\nThank you for visiting! Have a wonderful meal!")
                break
            
            if user_input.lower() == 'test':
                print("\nTesting Ollama API connection...")
                if test_ollama_connection():
                    print(" All tests passed! The API is working properly.\n")
                else:
                    print(" Some tests failed. Check the logs for details.\n")
                continue
            
            if user_input:
                print("\nAssistant:", generate_response(user_input), "\n")
                
        except KeyboardInterrupt:
            print("\n\nGoodbye! Enjoy your meal!")
            break
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            print("\nAn error occurred. Please try again.")

if __name__ == "__main__":
    main()
