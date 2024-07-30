import axios from 'axios';

export const register = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { name, email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
  console.log('response => ', response.data);
  return response.data;
};


