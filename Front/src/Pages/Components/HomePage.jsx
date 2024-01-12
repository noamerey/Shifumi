// HomePage.jsx
import React from 'react';
import Footer from './Footer';
import feu from '../assets/salameche.png';
import plante from '../assets/bulbizarre.png';
import eau from '../assets/carapuce.png';
import './Stylehomepage/HomePage.css';

export default function HomePage() {
    const gameRules = [
        { logo: feu, title: 'Feu', description: 'Le feu bat la plante' },
        { logo: eau, title: 'Eau', description: 'l\'eau bat le feu' },
        { logo: plante, title: 'Plante', description: 'la plante bat l\'eau' },
    ];

    return (
        <>
            <Header />

            <div className='main-content'>
                <div className='logo-chifoumi'>
                    {gameRules.map((rule, index) => (
                        <img className={`logo logo${index}`} src={rule.logo} alt={rule.title} />
                    ))}
                </div>

                <div className='title-and-description'>
                    <p className='title'>Starter</p>
                    <p className='descripftion'>Starter est un jeu de Chifoumi fait en React.</p>
                    <button className='main-button'><a href="/login" className='animated-button'>Jouer</a></button>
                </div>
                
                <div className='regles'>
                    <p className='regles-text'>Règles du jeu :</p>
                    <div className='circle'>
                    {gameRules.map((rule, index) => (
                        <div key={index} className={`arc arc${index}`}>
                        <img className={`logo logo${index}`} src={rule.logo} alt={rule.title} />
                        <p className='title-regle'>{rule.title}</p>
                        <p className='description-regle'>{rule.description}</p>
                        </div>
                        ))} 
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}