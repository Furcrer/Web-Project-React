import React from 'react';
import { Link } from 'react-router-dom';
import './css/footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>O nás</h3>
                        <p>Budúci Bakalári - tím nadšených študentov TUKE so záujmom o technológie, dizajn a moderný webový vývoj.</p>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Stránky</h3>
                        <ul>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/rozlozenie">Rozloženie</Link></li>
                            <li><Link to="/zaluby">Záľuby členov</Link></li>
                            <li><Link to="/zmeny">Zmeny v projekte</Link></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Právne informácie</h3>
                        <ul>
                            <li><Link to="/gdpr">GDPR a Ochrana údajov</Link></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Sledujte nás</h3>
                        <div className="social-links">
                            <a href="https://instagram.com/furcrer2k4" target="_blank" rel="noopener noreferrer" aria-label="Instagram Denis Ondruška">
                                <i className="fab fa-instagram"></i> Denis Ondruška
                            </a>
                            <a href="https://instagram.com/_richard_v_" target="_blank" rel="noopener noreferrer" aria-label="Instagram Richard Valenta">
                                <i className="fab fa-instagram"></i> Richard Valenta
                            </a>
                            <a href="https://instagram.com/tokytoky007" target="_blank" rel="noopener noreferrer" aria-label="Instagram Matúš Tokarčík">
                                <i className="fab fa-instagram"></i> Matúš Tokarčík
                            </a>
                            <a href="https://instagram.com/ivoverozpravky" target="_blank" rel="noopener noreferrer" aria-label="Instagram Dávid Krochliak">
                                <i className="fab fa-instagram"></i> Dávid Krochliak
                            </a>
                            <a href="https://instagram.com/buduci_bakalari" target="_blank" rel="noopener noreferrer" aria-label="Instagram Ukrajinec">
                                <i className="fab fa-instagram"></i> Ukrajinec
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; 2025 Budúci Bakalári. Všetky práva vyhradené.</p>
                    <p className="footer-subtext">Projektový tím TUKE | Fakulta elektrotechniky a informatiky</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;