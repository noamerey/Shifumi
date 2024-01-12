import React, { useState, useEffect } from 'react';
import matchlist from '../../Contexts/Actions/matchlist';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Style/login.css';
import Footer from './Footer';

function Match() {
  const [matchId, setMatchId] = useState(null);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  const createMatch = async () => {
    const id = await matchlist.add();
    setMatchId(id);
    navigate(`/match/${id}`);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (matchId) {
        const response = await fetch(`http://fauques.freeboxos.fr:3000/matches/${matchId}`);
        const data = await response.json();
        if (data.user2) {
          setMatches(prevMatches => [...prevMatches, data]);
          clearInterval(interval);
        }
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [matchId]);

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
        <button onClick={createMatch}>Start Match</button>
        <button onClick={handleLogout} className="btn">Déconnexion</button>
      </div>
      <Footer />
    </div>
  );
}

export default Match;