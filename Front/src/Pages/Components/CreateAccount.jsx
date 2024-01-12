import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../Contexts/Actions/user-fetch'; // Assuming user.js is in the same directory

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
    <div>
      <h1>Register Page</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {accountCreated ? (
        <p>Compte créé, <Link to="/login">voulez-vous vous connecter ?</Link></p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <label>
            Confirm Password:
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </label>
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
}

export default Register;