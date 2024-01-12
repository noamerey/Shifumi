import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import feu from '../../assets/salameche.png';
import plante from '../../assets/bulbizarre.png';
import eau from '../../assets/carapuce.png';
import '../Stylehomepage/HomePage.css';

export default function HomePage() {
    const gameRules = [
        { logo: feu, title: 'Feu', description: 'Le feu bat la plante' , wikiLink: 'https://www.pokepedia.fr/Salam%C3%A8che' },
        { logo: eau, title: 'Eau', description: 'l\'eau bat le feu', wikiLink: 'https://www.pokepedia.fr/Carapuce' },     
        { logo: plante, title: 'Plante', description: 'la plante bat l\'eau', wikiLink: 'https://www.pokepedia.fr/Bulbizarre' },
    ];

    return (
        <>
            <Header />

            <div className='main-content'>
                <div className='logo-chifoumi'>
                    {gameRules.map((rule, index) => (
                        <a href={rule.wikiLink} target="_blank" rel="noopener noreferrer">
                          <img className={`logo${index}`} src={rule.logo} alt={rule.title} />
                        </a>
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