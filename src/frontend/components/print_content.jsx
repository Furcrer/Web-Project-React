import React, { useState, useEffect } from 'react';
import './css/print_content.css';

const PrintContent = () => {    
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch products
    useEffect(() => {
        if (searchTerm === '') {
            setProducts([]);
            return;
        }

        fetch(`http://localhost/cenovky/src/backend/find_products.php?q=${encodeURIComponent(searchTerm)}`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, [searchTerm]);

    // Fetch categories
    useEffect(() => {
        fetch('http://localhost/cenovky/src/backend/get_categories.php')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    // Update selectedProduct field
    const handleFieldChange = (field, value) => {
        setSelectedProduct(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Add this function inside your component
    const saveData = async (e) => {
        e.preventDefault();

        if (!selectedProduct) return;

        try {
            // Send the selected product as JSON
            const res = await fetch('http://localhost/cenovky/src/backend/update_product.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedProduct)
            });

            // Parse JSON response from PHP
            const result = await res.json();

            if (result.success) {
                alert("Saved successfully!");
            } else {
                alert("Error: " + result.error);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to save");
        }
    };




    return (
        <div className='print-page'>
            <div className='search window'>
                <h2>Search</h2>
                <input 
                    type="text" 
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul className='product-list'>
                    {products.map(product => (
                        <li 
                            key={product.id} 
                            onClick={() => setSelectedProduct(product)}
                            style={{cursor: 'pointer'}}
                        >
                            <strong>{product.name}</strong><br />
                            <small>{product.price} €</small>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='edit window'>
                <h2>Edit</h2>
                {selectedProduct ? (
                    <form className='properties-list' onSubmit={saveData}>
                        <input 
                            type="text" 
                            value={selectedProduct.name}
                            onChange={e => handleFieldChange('name', e.target.value)}
                        />
                        <select
                            value={selectedProduct.category}
                            onChange={e => handleFieldChange('category', e.target.value)}
                        >
                            {categories.map((cat, i) => (
                                <option key={i} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <textarea 
                            value={selectedProduct.description}
                            onChange={e => handleFieldChange('description', e.target.value)}
                        />
                        <input 
                            type="number" 
                            value={selectedProduct.price}
                            onChange={e => handleFieldChange('price', e.target.value)}
                        />
                        <input 
                            type="number" 
                            value={selectedProduct.sale_price}
                            onChange={e => handleFieldChange('sale_price', e.target.value)}
                        />
                        <small>{selectedProduct.updated_at}</small>
                        <button type='submit'>Save Changes</button>
                    </form>
                ) : (
                    <p>Select a product to edit</p>
                )}
            </div>

            <div className='print window'>
                <h2>Items to Print</h2>
            </div>
        </div>
    );
};



export default PrintContent;
