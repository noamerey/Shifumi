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
import { useNavigate } from 'react-router-dom';
import EventSource from 'eventsource-polyfill';

function Game() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const eventSource = useRef(null);
  const [turnNumber, setTurnNumber] = useState(1);
  const [move, setMove] = useState(null);
  const [action, setAction] = useState(null);
  const [score, setScore] = useState({ user1: 0, user2: 0 });
  const navigate = useNavigate();

  const endMatch = async () => {
    navigate('/matchlist');
  };

  const handleEvent = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'PLAYER1_JOIN':
      case 'PLAYER2_JOIN':
        setAction(`${data.payload.user} a rejoint la partie`);
        break;
      case 'NEW_TURN':
        setAction(`Tour ${data.payload.turnId} commence`);
        break;
        case 'TURN_ENDED':
          setAction(`Tour ${data.payload.newTurnId} a terminé, ${data.payload.winner === 'draw' ? 'égalité' : `${data.payload.winner} a gagné`}`);
          if (data.payload.winner !== 'draw') {
            setScore(prevScore => ({
              ...prevScore,
              [data.payload.winner]: prevScore[data.payload.winner] + 1
            }));
          }
          break;
      case 'PLAYER1_MOVED':
      case 'PLAYER2_MOVED':
        setAction(`Le joueur a bougé au tour ${data.payload.turn}`);
        break;
      case 'MATCH_ENDED':
        setAction(`Le match a terminé, ${data.payload.winner === 'draw' ? 'égalité' : `${data.payload.winner} a gagné`}`);
        break;
      default:
        setAction(null);
    }
    // Update the match state with the new data
    setMatch(data);
  };

  useEffect(() => {
    retrieveMatch();
  
    const token = localStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };
  
    const eventSource = new EventSource(`http://fauques.freeboxos.fr:3000/matches/${id}/subscribe`, { headers });
  
    eventSource.onmessage = handleEvent;
    eventSource.onerror = () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      retrieveMatch();
    }, 5000); // Appelle retrieveMatch toutes les 5 secondes
  
    // Nettoie l'intervalle quand le composant est démonté
    return () => clearInterval(intervalId);
  }, []); // Les crochets vides signifient que l'effet s'exécute une fois au montage du composant

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

  /**useEffect(() => {
    console.log('Match object:', match);
    console.log(localStorage.getItem('userToken'));
  }, [match]);*/

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
        <p>Score: {score.user1} - {score.user2}</p>
        <p>{action}</p>
        {match && match.status === 'MATCH_ENDED' && (
          <button onClick={endMatch}>Retourner au menu</button>
        )}
        <TopImages />
      </div>
      <GameItem onChoice={handleMove} />
      <Footer />
    </div>
  );
}

export default Game;