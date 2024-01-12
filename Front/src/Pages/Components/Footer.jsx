import React from 'react';
import './Style/Footer.css';
import GithubLogo from '../../assets/github.png';
import pokemonImage from '../../assets/Pokemon.png';

export default function Footer() {
    const footerStyle = {
        backgroundImage: `url(${pokemonImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '30%',
    };

    return<>
        <div className='footer' style={footerStyle}>
            <p>Créé par Noa et Benoit</p>
            <a href="https://github.com/noamerey/Shifumi/tree/main"><img src={GithubLogo} alt="github logo" className='github-logo'/></a>
        </div>
    </>;
};