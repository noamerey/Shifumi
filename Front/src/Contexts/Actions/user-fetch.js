import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://fauques.freeboxos.fr:3000';

export async function loginUser(username, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
      saveToLocalStorage(response.data.token, username);
      return { status: 'success', data: response.data };
    } else {
      console.error('Login failed with response:', response.data);
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error);
    return { status: 'error', message: error.message };
  }
}

export async function registerUser(username, password) {
  const idUser = uuidv4();
  try {
    const response = await axios.post(`${API_URL}/register`, { id_: idUser, username, password });
    if (response.data.success) {
      return { status: 'success', data: response.data };
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    return { status: 'error', message: error.message };
  }
}

function saveToLocalStorage(token, username) {
  localStorage.setItem('userToken', token);
  localStorage.setItem('username', username);
}