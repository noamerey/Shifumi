import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Match() {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setNewMatch(event.target.value);
  };

  const handleAddMatch = () => {
    setMatches([...matches, newMatch]);
    setNewMatch('');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      <h1>Match Page</h1>
      <input type="text" value={newMatch} onChange={handleInputChange} />
      <button onClick={handleAddMatch}>Add Match</button>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>{match}</li>
        ))}
      </ul>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
}

export default Match;