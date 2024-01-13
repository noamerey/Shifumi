import React from 'react';

export default function GameItem({ onChoice }) {
  const handleItemClick = (choice) => {
    onChoice(choice);
  };

  return (
    <div>
      <button onClick={() => handleItemClick('rock')}>Salamèche</button>
      <button onClick={() => handleItemClick('paper')}>Carapuce</button>
      <button onClick={() => handleItemClick('scissor')}>Bulbizarre</button>
    </div>
  );
}