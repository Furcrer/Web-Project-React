import './css/header.css';

const Header = () => {
    return (
        <header>
            <nav>
                <div className="logo">
                    <h1>Buduci Bakalari</h1>
                </div>
                <ul className="nav-links">
                    <li><a href="/">Login</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/print">Print</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;