import React, { useState } from 'react';

import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Contexts/Actions/user-fetch'; // Assuming user.js is in the same directory

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(username, password);
      if (response.status === 'success') {
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('username', username);
        navigate('/matchlist');
      } else {
        console.error('Login error:', response.error);
        setError('Impossible de se connecter');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Impossible de se connecter');
    }
  };

  return (

    <>
    <Header />


    <div>
      <h1>Login Page</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      <button type="button" onClick={goToRegister}>Go to Register</button>
    </div>

    <Footer />
    </>
  );
}

export default Login;