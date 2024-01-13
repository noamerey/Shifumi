import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Style/login.css';
import { useNavigate } from 'react-router-dom';
import { loginUser} from '../../Contexts/Actions/user-fetch'; // Assuming user.js is in the same directory

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
    <div className="page-container">
      <div className="content-wrapper">
        <Header />
  
        <div>
          <h1>Connexion</h1>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              Pseudo:
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
              Mot de passe:
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button className="btn" type="submit">Login</button>
          </form>
          <button className="btn" type="button" onClick={goToRegister}>Pas de compte ? Créés en un !</button>
        </div>
      </div>
     
      <Footer />
    </div>
  );
}

export default Login;