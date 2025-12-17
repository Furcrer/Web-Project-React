import { useState, useEffect } from 'react';
import './css/header.css';

const Header = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1315); // Zmenené na 1315px
    
    const handleLogout = (e) => {
        e.preventDefault();
        
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            const desktop = window.innerWidth > 1315; // Zmenené na 1315px
            setIsDesktop(desktop);
            if (desktop) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header>
            <nav>
                <div className="logo">
                    <h1>Buduci Bakalari</h1>
                </div>
                
                {/* Hamburger Icon for Mobile - ZMENENÉ */}
                {!isDesktop && (
                    <div 
                        className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
                        onClick={toggleMenu}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
                
                {/* Navigation Links - ZMENENÉ */}
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li>
                        <span>Welcome, {user.meno}</span>
                    </li>
                    <li>
                        <a href="/login" onClick={handleLogout}>
                            Logout
                        </a>
                    </li>
                    <li><a href="/dashboard" onClick={closeMenu}>Dashboard</a></li>
                    <li><a href="/home-page" onClick={closeMenu}>Home Page</a></li>
                    <li><a href="/rozlozenie" onClick={closeMenu}>Rozlozenie</a></li>
                    <li><a href="/zaluby-clenov-tymu" onClick={closeMenu}>Zaluby</a></li>
                    <li><a href="/zmeny" onClick={closeMenu}>Zmeny</a></li>
                    <li><a href="/profile" onClick={closeMenu}>Profile</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;