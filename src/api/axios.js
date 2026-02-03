import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://hrms-backend-6grq.onrender.com/api"
    : "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
