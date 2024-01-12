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

  const joinMatch = async () => {
    const match = matches.find(match => match.user2 === null);
    if (match) {
      await matchlist.join(match._id);
      setMatchId(match._id);
      navigate(`/match/${match._id}`);
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
        <h1>Match List</h1>
        <button className='btn' type='button' onClick={joinMatch}>Rejoindre un match</button>
        <button className="btn" type='button' onClick={handleLogout}>Se déconnecter</button>
      </div>
      <Footer />
    </div>
  );
};

export default Match;