import axios from "axios";

// Use Vite env variable if available, else fallback to localhost
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";
console.log("API URL in use:", API_URL);

// Register user
export const createUser = (userData) => {
  console.log("Sending user data:", userData); // Debug log
  return axios.post(`${API_URL}/users/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Get all users
export const getAllUsers = () => {
  return axios.get(`${API_URL}/users`);
};
