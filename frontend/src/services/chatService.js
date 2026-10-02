import api from './api';

const chatService = {
  async sendMessage(messages) {
    const response = await api.post('/chatbot', { messages }, { timeout: 45000 });
    return response.data.reply;
  },
};

export default chatService;