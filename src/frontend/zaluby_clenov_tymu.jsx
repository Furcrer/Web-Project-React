import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGamepad, 
  faMotorcycle, 
  faCar,           // fa-car-side nemusí existovať v free verzii
  faLaptopCode,
  faBeer,
  faDumbbell,
  faUtensilSpoon,  // fa-spoon alternatíva
  faNetworkWired,
  faRunning,       // fa-person-running alternatíva
  faFutbol,
  faPlane,
  faUser,          // fa-person alternatíva
  faQuestion
} from '@fortawesome/free-solid-svg-icons';
import './components/css/zaluby.css';

const Zaluby = () => {
    return (
        <>
            <Header />
            <main>
                <div className="section">
                    <div id="denis" className="card">
                        <img src="./pics/denis_pfp3.jpg" alt="Profilova fotka clena tymu"/>            
                        <h3 className="name">Denis Ondruška</h3>
                        <ul className="popis">
                            <li><p><FontAwesomeIcon icon={faMotorcycle} /> Motorky</p></li>
                            <li><p><FontAwesomeIcon icon={faCar} /> Autá</p></li>
                            <li><p><FontAwesomeIcon icon={faLaptopCode} /> Programovanie</p></li>
                            <li><p><FontAwesomeIcon icon={faBeer} /> Socializovanie</p></li>
                            <li><p><FontAwesomeIcon icon={faGamepad} /> Gamesky</p></li>
                        </ul>
                    </div>

                    <div id="david" className="card">
                        <img src="./pics/david_pfp.png" alt="Profilova fotka clena tymu"/>
                        <h3 className="name">Dávid Krochliak</h3>
                        <ul className="popis">
                            <li><p><FontAwesomeIcon icon={faDumbbell} /> Gym</p></li>
                            <li><p><FontAwesomeIcon icon={faUtensilSpoon} /> Cooking</p></li>
                            <li><p><FontAwesomeIcon icon={faNetworkWired} /> Siete</p></li>
                            <li><p><FontAwesomeIcon icon={faBeer} /> Socializovanie</p></li>
                            <li><p><FontAwesomeIcon icon={faGamepad} /> Gamesky</p></li>
                        </ul>
                    </div>
                    
                    <div id="matus" className="card">
                        <img src="./pics/matus_pfp.png" alt="Profilova fotka clena tymu"/>
                        <h3 className="name">Matúš Tokarčík</h3>
                        <ul className="popis">
                            <li><p><FontAwesomeIcon icon={faMotorcycle} /> Motorky</p></li>
                            <li><p><FontAwesomeIcon icon={faRunning} /> Beh</p></li>
                            <li><p><FontAwesomeIcon icon={faFutbol} /> Futbal</p></li>
                            <li><p><FontAwesomeIcon icon={faBeer} /> Socializovanie</p></li>
                            <li><p><FontAwesomeIcon icon={faGamepad} /> Apex</p></li>
                        </ul>            
                    </div>
                    
                    <div id="richard" className="card">
                        <img src="./pics/richard_pfp.jpg" alt="Profilova fotka clena tymu"/>
                        <h3 className="name">Richard Valenta</h3>
                        <ul className="popis">
                            <li><p><FontAwesomeIcon icon={faDumbbell} /> Gym</p></li>
                            <li><p><FontAwesomeIcon icon={faPlane} /> Cestovanie</p></li>
                            <li><p><FontAwesomeIcon icon={faUser} /> Ženy</p></li>
                            <li><p><FontAwesomeIcon icon={faBeer} /> Socializovanie</p></li>
                            <li><p><FontAwesomeIcon icon={faGamepad} /> Lolko</p></li>
                        </ul>
                    </div>

                    <div id="ukrajinec" className="card">
                        <img src="./pics/ukrajinec_pfp.jpg" alt="Profilova fotka clena tymu"/>
                        <h3 className="name">Ukrajinec</h3>
                        <ul className="popis">
                            <li><p><FontAwesomeIcon icon={faQuestion} /><br/></p></li>
                            <li><p><FontAwesomeIcon icon={faQuestion} /><br/></p></li>
                            <li><p><FontAwesomeIcon icon={faQuestion} /><br/></p></li>
                            <li><p><FontAwesomeIcon icon={faQuestion} /><br/></p></li>
                            <li><p><FontAwesomeIcon icon={faQuestion} /><br/></p></li>
                        </ul>
                    </div>
                </div>      
            </main>
            <Footer />
        </>
    );
};

export default Zaluby;