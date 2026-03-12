import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-chatbot-backend-eev0.onrender.com/api/chat",
});

export default api;