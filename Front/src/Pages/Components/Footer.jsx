import React from 'react';
import './Style/Footer.css';
import GithubLogo from '../../assets/github.png';

export default function Footer() {
    return<>
        <div className='footer'>
            <p>Créé par Noa et Benoit</p>
            <a href="https://github.com/noamerey/Shifumi/tree/main"><img src={GithubLogo} alt="github logo" className='github-logo'/></a>
        </div>
    </>;
};
