import { v4 as uuidv4 } from 'uuid';

export const loginUser = async (username, password) => {
    try {
      const response = await fetch('http://fauques.freeboxos.fr:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        saveTokenAndUsernameToLocalStorage(data.token, username);
        return data.token;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};

export const registerUser = async (username, password) => {
    const idUser = uuidv4();
    try {
      const response = await fetch('http://fauques.freeboxos.fr:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_: idUser, username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.token;
      } else {
        throw new Error('Register failed');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};

const saveTokenAndUsernameToLocalStorage = (token, username) => {
  localStorage.setItem('userToken', token);
  localStorage.setItem('username', username);
};