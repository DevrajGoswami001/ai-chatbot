import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-chatbot-backend-eev0.onrender.com/chat",
  timeout: 10000,
});

export default api;