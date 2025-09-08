import axios from "axios";

import React from 'react'

const API_URL = "http://localhost:8081/api";

export const createUser = (username, password, email) => {
  return axios.post(`${API_URL}/users/register` , username, password, email);
}

export const getAllUsers = () => {
  return axios.get(`${API_URL}/users`);
}
