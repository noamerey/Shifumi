import React, { useState, useEffect } from 'react';
import matchlist from '../../Contexts/Actions/matchlist';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Style/login.css';
import Footer from './Footer';

function Match() {
  const [matchId, setMatchId] = useState(null);
  const [matches, setMatches] = useState([]);
  const [showMatches, setShowMatches] = useState(false);
  const navigate = useNavigate();

  const createMatch = async () => {
    const id = await matchlist.add();
    setMatchId(id);
    retrieveMatches();
    navigate(`/match/${id}`);
  };

  const retrieveMatches = async () => {
    fetch('http://fauques.freeboxos.fr:3000/matches',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setMatches(data);
    })
  } 

  const joinMatch = async () => {
    const currentUser = localStorage.getItem('username');
    const match = matches.find(match => match.user2 === null || match.user1.username === currentUser || match.user2.username === currentUser);
    if (match) {
      if (match.user1.username === currentUser || (match.user2 && match.user2.username === currentUser)) {
        setMatchId(match._id);
        navigate(`/match/${match._id}`);
      } else {
        await matchlist.join(match._id);
        setMatchId(match._id);
        navigate(`/match/${match._id}`);
      }
    } else {
      createMatch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  useEffect(() => {
    const getMatches = async () => {
      const data = await matchlist.fetch();
      setMatches(data);
    };

    getMatches();
  }, []);

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <Header />
        <h1>Liste des matchs</h1>
        <button className='btn' type='button' onClick={() => setShowMatches(!showMatches)}>
          {showMatches ? 'Cacher les matchs' : 'Voir les matchs'}
        </button>
        {showMatches && matches.map(match => (
          <div key={match._id}>
            <p>Match ID: {match._id}</p>
            <p>User1: {match.user1.username}</p>
            <p>User2: {match.user2 ? match.user2.username : 'Waiting for player...'}</p>
          </div>
        ))}
        <button className='btn' type='button' onClick={joinMatch}>Rejoindre un match</button>
        <button className="btn" type='button' onClick={handleLogout}>Se déconnecter</button>
      </div>
      <Footer />
    </div>
  );
};

export default Match;