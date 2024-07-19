import axios from 'axios';

export const register = async (name: string, email: string, password: string) => {
  const response = await axios.post(`http://localhost:5000/api/auth/register`, { name, email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`http://localhost:5000/api/auth/login`, { email, password });
  console.log('response => ', response.data);
  return response.data;
};


