import React from 'react';
import { useNavigate } from "react-router-dom";


function GameList({ games }) {
    const navigate = useNavigate();

    const handleNavigateToGame = (gameId) => {
        navigate(`/match/${gameId}`);
    };

    return (
        <div>
            {games.map((game) => (
                <div key={game.id}>
                    <button onClick={() => handleNavigateToGame(game.id)}>
                        {game.user1 ? game.user1.username : 'Loading...'} vs {game.user2 ? game.user2.username : 'Waiting for player...'}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default GameList;