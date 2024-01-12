import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import './Style/login.css';



function Match() {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({});

  // Fetch matches when component mounts
  useEffect(() => {
    axios.get('http://fauques.freeboxos.fr:3000/matches')
      .then(response => {
        setMatches(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  // Function to handle form submission
  const handleSubmit = event => {
    event.preventDefault();
  
    const userToken = localStorage.getItem('userToken');
  
    axios.post('http://fauques.freeboxos.fr:3000/matches', newMatch, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
      .then(response => {

        setMatches([...matches, response.data]);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="page-container">
      <Header />
      <div className="content-wrap">
        <h1>Matches</h1>
        {matches.map(match => (
          <div key={match._id}>
            <p>User 1: {match.user1.username}</p>
            <p>User 2: {match.user2 ? match.user2.username : 'N/A'}</p>
          </div>
        ))}

        <h2>Create a new match</h2>
        <form onSubmit={handleSubmit}>
          <label>
            User 1:
            <input type="text" name="user1" onChange={e => setNewMatch({ ...newMatch, user1: e.target.value })} />
          </label>
          <button type="submit" className="btn">Create</button> {/* Apply the login-button class */}
          <button onClick={handleLogout} className="btn">Déconnexion</button> {/* Apply the login-button class */}
        </form>
      </div>
      <Footer />
    </div>
  );
}
export default Match;