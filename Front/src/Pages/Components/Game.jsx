import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Style/login.css';
import Header from './Header';
import Footer from './Footer';
import matchlist from '../../Contexts/Actions/matchlist';
import GameItem, { TopImages } from './GameItem';
import background from '../../assets/Terrain.jpg';
import feu from '../../assets/Salameche.png';
import eau from '../../assets/Carapuce.png';
import plante from '../../assets/Bulbizarre.png';

function Game() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const eventSource = useRef(null);
  const [turnNumber, setTurnNumber] = useState(1);
  const [move, setMove] = useState(null);

  const retrieveMatch = async () => {
    fetch(`http://fauques.freeboxos.fr:3000/matches/${id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setMatch(data);
      if (data.user2) {
        setLoading(false);
      }
    })
    .catch((error) => {
      setError(error);
    });
  }

  const handleMove = async (move) => {
    setMove(move);
    // Send the move to the server
    console.log(localStorage.getItem('userToken'));
    const response = await fetch(`http://fauques.freeboxos.fr:3000/matches/${id}/turns/${turnNumber}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      },
      body: JSON.stringify({ move }),
    });
  
    if (response.status === 400) {
      const errorData = await response.json();
      if (errorData.turn === 'not found') {
        // Handle 'turn not found' error
        console.log('Turn not found');
      } else if (errorData.turn === 'not last') {
        // Handle 'turn not last' error
        console.log('Turn not last');
      } else if (errorData.match === 'Match already finished') {
        // Handle 'Match already finished' error
        console.log('Match already finished');
      } else if (errorData.user === 'move already given') {
        // Handle 'move already given' error
        console.log('Move already given');
      }
    } else if (response.status === 202) {
      // Handle successful move
      setTurnNumber(turnNumber + 1);
    }
  }

  useEffect(() => {
    retrieveMatch();

    // Subscribe to match notifications
    eventSource.current = new EventSource(`http://fauques.freeboxos.fr:3000/matches/${id}/subscribe`);
    eventSource.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Update the match state with the new data
      setMatch(data);
    };

    return () => {
      if (eventSource.current) {
        eventSource.current.close();
      }
    };
  }, []);

  if (loading) {
    return <div>Waiting for player...</div>;
  }

  return (
    <div className="page-container" style={{ 
      backgroundImage: `url(${background})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '140vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'flex-end', 
      alignItems: 'center' 
    }}>
      <div className="content-wrapper" style={{
        justifyContent: 'flex-end', 
        alignItems: 'center' 
      }}>
        <Header />
        <h1>{match && match.user1 ? match.user1.username : 'Loading...'} vs {match && match.user2 ? match.user2.username : 'Waiting for player...'}</h1>
        <TopImages />
      </div>
      <GameItem onChoice={handleMove} />
      <Footer />
    </div>
  );
}

export default Game;