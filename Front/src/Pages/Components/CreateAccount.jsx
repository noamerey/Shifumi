import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../Contexts/Actions/user-fetch'; // Assuming user.js is in the same directory
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import './Style/login.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return;
    }
    try {
      const response = await registerUser(username, password);
      console.log('Succès de l\'inscription');
      setAccountCreated(true);
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'inscription', error);
      setErrorMessage('Une erreur est survenue lors de l\'inscription');
    }
  };

  return (
    <div className="page-container">
      <Header />
      <div className="content-wrap">
      <h1>Création de compte</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {accountCreated ? (
        <p>Compte créé, <Link to="/login">voulez-vous vous connecter ?</Link></p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Pseudo:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Mot de passe:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <label>
            Confirmation de mot de passe:
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </label>
          <button type="submit" className="btn">Créer le compte</button> 
        </form>
      )}
    </div>
    <Footer />
    </div>
  );
}

export default Register;