import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/chat",
  timeout: 10000,
});

export default api;