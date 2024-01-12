import React from 'react';
import './Style/Header.css';
import pokeball from '../../assets/Pokeball.png';

export default function Header() {
    return<>
        <div className='header'>
            <div className='links'>
                <a href="/"><img className='logo-header' src={pokeball} alt="Accueil" /></a>
                <a href="https://fr.wikipedia.org/wiki/Pokémon" target="_blank" rel="noopener noreferrer">A propos</a>
            </div>
            <div className='connexion-box'>
                <a href="/login">Jouer</a>
            </div>
        </div>
    </>;
};

