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
                    {user.email && (
                        <li>
                            <span>Welcome, {user.email}</span>
                        </li>
                    )}
                    <li>
                        <a href="/login" onClick={handleLogout}>
                            Logout
                        </a>
                    </li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/print">Print</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;