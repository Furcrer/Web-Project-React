import React, { useState, useEffect } from "react";

import Header from './components/header.jsx'
import Footer from './components/footer.jsx'

export default function Dashboard() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`http://localhost:3000/backend/find_products.php?q=${search}`);
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, [search]);

    return (
        <>
            <Header />
            <div>
            <h1>Dashboard</h1>
            <input
                type="text"
                placeholder="Find product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                    {p.name} - ${parseFloat(p.price).toFixed(2)}
                </li>
                ))}
            </ul>
            </div>
            <Footer />
        </>
    );
}
