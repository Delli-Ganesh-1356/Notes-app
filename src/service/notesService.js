import axios from "axios";

// Use env variable if available, else fallback to localhost
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";
console.log("API URL in use:", API_URL);


// Helper function to build headers
const getAuthHeaders = (token) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Get Notes by User
export const getNotes = (userId, token) => {
  return axios.get(`${API_URL}/notes/${userId}`, {
    headers: getAuthHeaders(token),
  });
};

// ✅ Add Note
export const addNote = (userId, note, token) => {
  return axios.post(`${API_URL}/notes/${userId}`, note, {
    headers: getAuthHeaders(token),
  });
};

// ✅ Update Note
export const updateNote = (id, note, token) => {
  return axios.put(`${API_URL}/notes/${id}`, note, {
    headers: getAuthHeaders(token),
  });
};

// ✅ Delete Note
export const deleteNote = (id, token) => {
  return axios.delete(`${API_URL}/notes/${id}`, {
    headers: getAuthHeaders(token),
  });
};
