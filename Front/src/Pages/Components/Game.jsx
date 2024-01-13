import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Style/login.css';
import Header from './Header';
import Footer from './Footer';
import matchlist from '../../Contexts/Actions/matchlist';

function Game() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const data = await matchlist.fetch(`${id}`);
        setMatch(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchMatch();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <Header />
        <h1>{match.user1 ? match.user1.username : 'Loading...'} vs {match.user2 ? match.user2.username : 'Waiting for player...'}</h1>
      </div>
      <Footer />
    </div>
  );
};

export default Game;