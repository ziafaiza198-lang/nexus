import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // backend ka URL

export const registerUser = (formData) => {
  return axios.post(`${API_URL}/register`, formData);
};

export const loginUser = (formData) => {
  return axios.post(`${API_URL}/login`, formData);
};
