import React, { useState, useEffect } from 'react';
import './css/print_content.css';

const PrintContent = () => {    
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [printQueue, setPrintQueue] = useState([]); // New state for print queue

    // Load print queue from localStorage on component mount
    useEffect(() => {
        const savedQueue = localStorage.getItem('printQueue');
        if (savedQueue) {
            try {
                setPrintQueue(JSON.parse(savedQueue));
            } catch (error) {
                console.error('Error loading print queue from localStorage:', error);
            }
        }
    }, []);

    // Save print queue to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('printQueue', JSON.stringify(printQueue));
    }, [printQueue]);

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

    // Save data function
    const saveData = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost/cenovky/src/backend/update_product.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedProduct)
            });

            const text = await res.text(); // get raw response
            console.log("PHP response:", text);

            const result = JSON.parse(text); // parse JSON
            if (result.success) {
                alert("Saved successfully!");
            } else {
                alert("Error: " + result.error);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to save (network or PHP error)");
        }
    };

    // Add to print queue
    const addToPrintQueue = (product) => {
        // Check if product is already in queue
        const isAlreadyInQueue = printQueue.some(item => item.id === product.id);
        
        if (isAlreadyInQueue) {
            alert(`${product.name} is already in the print queue!`);
            return;
        }
        
        setPrintQueue(prev => [...prev, {
            id: product.id,
            name: product.name,
            price: product.price,
            sale_price: product.sale_price,
            category: product.category
        }]);
    };

    // Remove from print queue
    const removeFromPrintQueue = (productId) => {
        setPrintQueue(prev => prev.filter(item => item.id !== productId));
    };

    // Clear print queue
    const clearPrintQueue = () => {
        if (window.confirm(`Clear all ${printQueue.length} items from print queue?`)) {
            setPrintQueue([]);
        }
    };

    // Open print page
    const openPrintPage = () => {
        if (printQueue.length === 0) {
            alert("Print queue is empty!");
            return;
        }

        // Create a blob with the print data
        const printData = {
            items: printQueue,
            generatedAt: new Date().toISOString()
        };

        // Convert to base64 for URL parameter
        const encodedData = btoa(JSON.stringify(printData));
        
        // Open print page in new tab
        window.open(`/print.html?data=${encodedData}`, '_blank');
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
                            <div className="product-info">
                                <strong>{product.name}</strong><br />
                                <small>{product.price} €</small>
                            </div>
                            <button 
                                className="add-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToPrintQueue(product);
                                }}
                                title="Add to print queue"
                            >
                                +
                            </button>
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
                        <div className="form-actions">
                            <button type='submit'>Save Changes</button>
                            <button 
                                type="button" 
                                className="add-btn"
                                onClick={() => addToPrintQueue(selectedProduct)}
                            >
                                Add to Print Queue
                            </button>
                        </div>
                    </form>
                ) : (
                    <p>Select a product to edit</p>
                )}
            </div>

            <div className='print window'>
                <div className="print-header">
                    <h2>Items to Print ({printQueue.length})</h2>
                    <div className="print-actions">
                        <button 
                            onClick={openPrintPage}
                            disabled={printQueue.length === 0}
                            className="print-btn"
                        >
                            Open Print Page
                        </button>
                        <button 
                            onClick={clearPrintQueue}
                            disabled={printQueue.length === 0}
                            className="clear-btn"
                        >
                            Clear All
                        </button>
                    </div>
                </div>
                
                {printQueue.length > 0 ? (
                    <ul className="print-queue">
                        {printQueue.map((item) => (
                            <li key={item.id} className="print-item">
                                <div className="print-item-info">
                                    <span className="print-item-name">{item.name}</span>
                                    <div className="print-item-price">
                                        {item.sale_price && item.sale_price > 0 ? (
                                            <>
                                                <span className="sale-price">€{item.sale_price}</span>
                                                <span className="original-price">€{item.price}</span>
                                            </>
                                        ) : (
                                            <span>€{item.price}</span>
                                        )}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeFromPrintQueue(item.id)}
                                    className="remove-btn"
                                    title="Remove from queue"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="empty-queue">No items in print queue</p>
                )}
            </div>
        </div>
    );
};

export default PrintContent;