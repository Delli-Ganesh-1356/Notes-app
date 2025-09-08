import axios from "axios";

import React from 'react'

const API_URL = "http://localhost:8081/api/auth";

export const loginUser = (username, password) => {
 return axios.post(`${API_URL}/login`, {username, password});
}
