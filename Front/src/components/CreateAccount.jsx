import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username: username,
        password: password,
      });

      if (response.data.status === 'ok') {
        console.log('Succès de l\'inscription');
        // Redirigez l'utilisateur vers la page de connexion ou de bienvenue
      } else {
        console.error('Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'inscription', error);
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;