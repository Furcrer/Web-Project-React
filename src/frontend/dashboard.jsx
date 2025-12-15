import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import './components/css/dashboard.css';

export default function Dashboard() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usersLoading, setUsersLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('products');
    
    // User list filters
    const [filterType, setFilterType] = useState('meno');
    const [filterValue, setFilterValue] = useState('');
    
    // User list sorting
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    
    const navigate = useNavigate();

    // Check authentication
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/backend/find_products.php?q=${search}`);
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        if (activeTab === 'products') {
            fetchProducts();
        }
    }, [search, activeTab]);

    // Fetch users
    const fetchUsers = async () => {
        try {
            setUsersLoading(true);
            
            const queryParams = new URLSearchParams();
            
            if (filterValue.trim()) {
                queryParams.append('filterType', filterType);
                queryParams.append('filterValue', filterValue);
            }
            
            queryParams.append('sortBy', sortBy);
            queryParams.append('sortOrder', sortOrder);
            
            const res = await fetch(`http://localhost/cenovky/src/backend/get_users.php?${queryParams}`);
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setUsersLoading(false);
        }
    };

    // Fetch users when tab changes
    useEffect(() => {
        if (activeTab === 'users') {
            fetchUsers();
        }
    }, [activeTab, sortBy, sortOrder]);

    // Handle sort
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    // Clear filter
    const clearFilter = () => {
        setFilterValue('');
        fetchUsers();
    };

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.email) {
        return null;
    }

    return (
        <>
            <Header />
            <div className="dashboard-container">
                {/* Tabs */}
                <div className="tabs-container">
                    <button 
                        onClick={() => setActiveTab('products')}
                        className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
                    >
                        Products
                    </button>
                    <button 
                        onClick={() => setActiveTab('users')}
                        className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
                    >
                        Výpis používateľov
                    </button>
                </div>

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="products-section">
                        <h1 className="section-title">Dashboard</h1>
                        <input
                            type="text"
                            placeholder="Find product..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />

                        {loading ? (
                            <p className="loading-text">Loading products...</p>
                        ) : (
                            <ul className="products-list">
                                {products.length > 0 ? (
                                    products.map((p) => (
                                        <li key={p.id} className="product-item">
                                            {p.name} - ${parseFloat(p.price).toFixed(2)}
                                        </li>
                                    ))
                                ) : (
                                    <li className="no-results">No products found</li>
                                )}
                            </ul>
                        )}
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="users-section">
                        <h2 className="section-title">Výpis registrovaných používateľov</h2>
                        
                        {/* Filter Section */}
                        <div className="filter-section">
                            <h3 className="filter-title">Filtrovanie</h3>
                            <div className="filter-grid-simple">
                                <div className="filter-group">
                                    <label className="filter-label">Filtrovať podľa:</label>
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="filter-select"
                                    >
                                        <option value="meno">Meno</option>
                                        <option value="stat">Štát</option>
                                        <option value="email">Email</option>
                                        <option value="rok_narodenia">Rok narodenia</option>
                                        <option value="telefon">Telefón</option>
                                    </select>
                                </div>
                                <div className="filter-group">
                                    <label className="filter-label">Hodnota:</label>
                                    <input
                                        type="text"
                                        value={filterValue}
                                        onChange={(e) => setFilterValue(e.target.value)}
                                        placeholder="Zadajte hodnotu pre filter"
                                        className="filter-input"
                                    />
                                </div>
                            </div>
                            <div className="filter-buttons">
                                <button 
                                    onClick={fetchUsers}
                                    className="filter-button"
                                >
                                    Filtrovať
                                </button>
                                <button 
                                    onClick={clearFilter}
                                    className="filter-button reset-button"
                                >
                                    Zrušiť filter
                                </button>
                            </div>
                        </div>

                        {/* Users Table */}
                        {usersLoading ? (
                            <p className="loading-text">Načítavam používateľov...</p>
                        ) : (
                            <div className="users-table-container">
                                <table className="users-table">
                                    <thead>
                                        <tr>
                                            <th 
                                                className="sortable-header"
                                                onClick={() => handleSort('id')}
                                            >
                                                ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                                            </th>
                                            <th 
                                                className="sortable-header"
                                                onClick={() => handleSort('meno')}
                                            >
                                                Meno {sortBy === 'meno' && (sortOrder === 'asc' ? '↑' : '↓')}
                                            </th>
                                            <th 
                                                className="sortable-header"
                                                onClick={() => handleSort('rok_narodenia')}
                                            >
                                                Rok narodenia {sortBy === 'rok_narodenia' && (sortOrder === 'asc' ? '↑' : '↓')}
                                            </th>
                                            <th 
                                                className="sortable-header"
                                                onClick={() => handleSort('stat')}
                                            >
                                                Štát {sortBy === 'stat' && (sortOrder === 'asc' ? '↑' : '↓')}
                                            </th>
                                            <th 
                                                className="sortable-header"
                                                onClick={() => handleSort('email')}
                                            >
                                                Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                                            </th>
                                            <th 
                                                className="sortable-header"
                                                onClick={() => handleSort('telefon')}
                                            >
                                                Telefón {sortBy === 'telefon' && (sortOrder === 'asc' ? '↑' : '↓')}
                                            </th>
                                            <th className="table-header">Poznámka</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 ? (
                                            users.map((userItem) => (
                                                <tr key={userItem.id} className="user-row">
                                                    <td className="table-cell">{userItem.id}</td>
                                                    <td className="table-cell">{userItem.meno}</td>
                                                    <td className="table-cell">{userItem.rok_narodenia}</td>
                                                    <td className="table-cell">{userItem.stat}</td>
                                                    <td className="table-cell">{userItem.email}</td>
                                                    <td className="table-cell">{userItem.telefon || '-'}</td>
                                                    <td className="table-cell">{userItem.poznamka || '-'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="no-data-cell">
                                                    {filterValue ? 'Žiadni používatelia podľa zadaného filtra' : 'Žiadni registrovaní používatelia'}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="table-info">
                                    <p>Celkový počet používateľov: {users.length}</p>
                                    <p>Zoradené podľa: {getColumnName(sortBy)} ({sortOrder === 'asc' ? 'vzostupne' : 'zostupne'})</p>
                                    {filterValue && (
                                        <p>Aktuálny filter: {getColumnName(filterType)} = "{filterValue}"</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

// Helper function to get column display names
function getColumnName(column) {
    const columnNames = {
        'id': 'ID',
        'meno': 'Meno',
        'rok_narodenia': 'Rok narodenia',
        'stat': 'Štát',
        'email': 'Email',
        'telefon': 'Telefón',
        'poznamka': 'Poznámka'
    };
    return columnNames[column] || column;
}