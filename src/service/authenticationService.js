import axios from "axios";

// Use env variable if available, else fallback to localhost for local dev
const API_URL = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api"}/auth`;

export const loginUser = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};
