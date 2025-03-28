import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

interface ChatResponse {
  response?: string;
  error?: string;
  message?: {
    content: string;
  };
}

export const chatService = {
  sendMessage: async (message: string) => {
    try {
      const response = await axios.post<ChatResponse>(`${API_BASE_URL}/chat`, { message });
      
      // Handle different response formats
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      
      return {
        response: response.data.response || response.data.message?.content || '',
        status: 'success'
      };
    } catch (error: any) {
      console.error('Error sending message:', error);
      return {
        response: error.message || 'An error occurred while processing your request',
        status: 'error'
      };
    }
  },
};
