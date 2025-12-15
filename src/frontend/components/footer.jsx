import './css/footer.css';

const Footer = () => {
    return (
        <footer>
            <div>
                <div>
                    <div>
                        <h3>About</h3>
                        <p>Your company description here.</p>
                    </div>
                    <div>
                        <h3>Links</h3>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/Dashboard">Dashboard</a></li>
                            <li><a href="/Print">Print</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Legal</h3>
                        <ul>
                            <li><a href="/privacy">Privacy</a></li>
                            <li><a href="/terms">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p>&copy; 2025 Buduci Bakalari. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;