interface ChatMessage {
  role: string;
  content: string;
}

interface ChatResponse {
  message: {
    content: string;
  };
}

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
