import axios from "axios";

const API_URL = "http://localhost:8081/api";

// ✅ Get Notes by User
export const getNotes = (userId, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.get(`${API_URL}/notes/${userId}`, { headers });
};

// ✅ Add Note
export const addNote = (userId, note, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.post(`${API_URL}/notes/${userId}`, note, { headers });
};

// ✅ Update Note
export const updateNote = (id, note, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.put(`${API_URL}/notes/${id}`, note, { headers });
};

// ✅ Delete Note
export const deleteNote = (id, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.delete(`${API_URL}/notes/${id}`, { headers });
};
