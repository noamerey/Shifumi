import React from 'react';
import feu from '../../assets/salameche.png';
import plante from '../../assets/bulbizarre.png';
import eau from '../../assets/carapuce.png';
import './Style/GameItem.css';

export default function GameItem({ onChoice }) {
  const handleItemClick = (choice) => {
    onChoice(choice);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '300px' }}>
      <button onClick={() => handleItemClick('rock')}>
        <img src={feu} alt="rock" style={{ width: '100px' }} />
      </button>
      <button onClick={() => handleItemClick('paper')}>
        <img src={eau} alt="paper" style={{ width: '100px' }} />
      </button>
      <button onClick={() => handleItemClick('scissor')}>
        <img src={plante} alt="scissor" style={{ width: '100px' }} />
      </button>
    </div>
  );
}

export function TopImages() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '300px', margin: '0 auto' }}>
        <img src={feu} alt="rock" style={{ width: '100px' }} />
        <img src={eau} alt="paper" style={{ width: '100px' }} />
        <img src={plante} alt="scissor" style={{ width: '100px' }} />
      </div>
    );
  }