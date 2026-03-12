import axios from "axios";

const api = axios.create({
  baseURL: "https://your-render-backend.onrender.com/chat",
  timeout: 10000,
});

export default api;