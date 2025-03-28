from chatbot import generate_response

def main():
    print("Restaurant Chatbot Assistant (type 'quit' to exit)")
    question = "What's on the menu?"
    print(f"\nYou: {question}")
    response = generate_response(question)
    print(f"\nAssistant: {response}")
    
    while True:
        user_input = input("\nYou: ")
        if user_input.lower() == 'quit':
            break
        response = generate_response(user_input)
        print(f"\nAssistant: {response}")

if __name__ == "__main__":
    main()
