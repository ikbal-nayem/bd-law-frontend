import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/chat';

export const chatMessage = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, {
      message: message,
    });
    return response.data.response;
  } catch (error) {
    console.error('API error:', error);
    return 'Sorry, I encountered an error processing your request. Please try again.';
  }
};