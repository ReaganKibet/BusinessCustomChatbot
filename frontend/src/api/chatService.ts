import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

interface ChatResponse {
  response: string;
  status: string;
}

export const chatService = {
  sendMessage: async (message: string) => {
    try {
      const response = await axios.post<ChatResponse>(`${API_BASE_URL}/chat`, { 
        message 
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout for Ollama responses
      });
      
      return {
        response: response.data.response,
        status: 'success'
      };
    } catch (error: any) {
      if (error.code === 'ECONNABORTED') {
        return {
          response: 'Request timed out. Please try again.',
          status: 'error'
        };
      }
      
      if (error.response?.status === 503) {
        return {
          response: 'AI service is currently unavailable. Please ensure Ollama is running.',
          status: 'error'
        };
      }

      return {
        response: error.response?.data?.detail || 'An error occurred while processing your request',
        status: 'error'
      };
    }
  },
};
