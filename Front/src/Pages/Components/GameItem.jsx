import React from 'react';
import feu from '../../assets/salameche.png';
import plante from '../../assets/bulbizarre.png';
import eau from '../../assets/carapuce.png';

export default function GameItem({ onChoice }) {
  const handleItemClick = (choice) => {
    onChoice(choice);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '300px' }}>
      <button onClick={() => handleItemClick('rock')}>
        <img src={feu} alt="rock" style={{ width: '80px' }} />
      </button>
      <button onClick={() => handleItemClick('paper')}>
        <img src={eau} alt="paper" style={{ width: '80px' }} />
      </button>
      <button onClick={() => handleItemClick('scissor')}>
        <img src={plante} alt="scissor" style={{ width: '80px' }} />
      </button>
    </div>
  );
}