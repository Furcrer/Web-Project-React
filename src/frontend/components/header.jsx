import './css/header.css';

const Header = () => {
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const handleLogout = (e) => {
        e.preventDefault();
        
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    };

    return (
        <header>
            <nav>
                <div className="logo">
                    <h1>Buduci Bakalari</h1>
                </div>
                <ul className="nav-links">
                    <li>
                        <span>Welcome, {user.meno}</span>
                    </li>
                    <li>
                        <a href="/login" onClick={handleLogout}>
                            Logout
                        </a>
                    </li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/home-page">Home Page</a></li>
                    <li><a href="/rozlozenie">Rozlozenie</a></li>
                    <li><a href="/zaluby-clenov-tymu">Zaluby</a></li>
                    <li><a href="/zmeny">Zmeny</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;