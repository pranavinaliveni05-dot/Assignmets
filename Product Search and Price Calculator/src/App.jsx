 import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './App.css';

// Child Component - Displays product information and receives memoized delete function
const ProductList = React.memo(({ products, onRemoveProduct }) => {
  console.log("ProductList rendered"); // For debugging memoization
  
  return (
    <div className="product-list">
      <h3>Product List ({products.length})</h3>
      {products.length === 0 ? (
        <p className="empty-message">No products found.</p>
      ) : (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <div className="product-info">
                <span className="product-name">{product.name}</span>
                <span className="product-price">₹{product.price.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => onRemoveProduct(index)}
                className="remove-btn"
                aria-label={`Remove ${product.name}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

const ProductSearchAndCalculator = () => {
  // useState: Store list of products with names and prices
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 75000 },
    { id: 2, name: "Smartphone", price: 25000 },
    { id: 3, name: "Headphones", price: 2000 },
    { id: 4, name: "Keyboard", price: 1500 },
    { id: 5, name: "Mouse", price: 800 },
    { id: 6, name: "Monitor", price: 15000 },
    { id: 7, name: "Printer", price: 12000 },
    { id: 8, name: "Speaker", price: 3500 }
  ]);
  
  // useState: Track search input value
  const [searchTerm, setSearchTerm] = useState('');
  
  // useState: Track new product inputs
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  // useRef: Reference for search input field
  const searchInputRef = useRef(null);

  // useEffect: Update browser tab title with current search text
  useEffect(() => {
    if (searchTerm.trim() === '') {
      document.title = 'Product Search - All Products';
    } else {
      document.title = `Searching: "${searchTerm}" - Product Dashboard`;
    }
    
    // Cleanup function
    return () => {
      document.title = 'Product Search and Price Calculator';
    };
  }, [searchTerm]);

  // useMemo: Filter products based on search term
  const filteredProducts = useMemo(() => {
    console.log("Filtering products..."); // For debugging memoization
    if (searchTerm.trim() === '') {
      return products;
    }
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // useMemo: Calculate total price of all currently displayed products
  const totalPrice = useMemo(() => {
    console.log("Calculating total price..."); // For debugging memoization
    return filteredProducts.reduce((total, product) => total + product.price, 0);
  }, [filteredProducts]);

  // useMemo: Calculate average price of displayed products
  const averagePrice = useMemo(() => {
    console.log("Calculating average price...");
    if (filteredProducts.length === 0) return 0;
    return totalPrice / filteredProducts.length;
  }, [filteredProducts, totalPrice]);

  // useMemo: Get product count
  const productCount = useMemo(() => {
    console.log("Calculating product count...");
    return filteredProducts.length;
  }, [filteredProducts]);

  // useCallback: Memoized function for removing products
  const handleRemoveProduct = useCallback((indexToRemove) => {
    setProducts(prevProducts => 
      prevProducts.filter((_, index) => index !== indexToRemove)
    );
  }, []);

  // Function to add new product
  const handleAddProduct = () => {
    const trimmedName = newProductName.trim();
    const price = parseFloat(newProductPrice);
    
    if (trimmedName === '') {
      alert('Please enter a product name.');
      return;
    }
    
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price (greater than 0).');
      return;
    }
    
    const newProduct = {
      id: Date.now(), // Unique ID based on timestamp
      name: trimmedName,
      price: price
    };
    
    setProducts(prevProducts => [...prevProducts, newProduct]);
    
    // Clear input fields
    setNewProductName('');
    setNewProductPrice('');
    
    // Focus back on search input
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Function to clear search
  const clearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Function to focus search input
  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Handle Enter key press in search
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Search is already happening, just keep focus
      focusSearchInput();
    }
  };

  return (
    <div className="dashboard">
      <h1>🛍️ Product Search & Price Calculator</h1>
      
      {/* Search Section */}
      <div className="search-section">
        <div className="search-container">
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearchKeyPress}
            placeholder="🔍 Search products by name..."
            className="search-input"
          />
          <button onClick={clearSearch} className="btn btn-clear">
            Clear
          </button>
          <button onClick={focusSearchInput} className="btn btn-focus">
            Focus Search
          </button>
        </div>
        {searchTerm && (
          <p className="search-result-info">
            Showing results for: <strong>"{searchTerm}"</strong>
          </p>
        )}
      </div>

      {/* Statistics Section */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Products Found</h3>
            <p className="stat-value">{productCount}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Total Price</h3>
            <p className="stat-value">₹{totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>Average Price</h3>
            <p className="stat-value">₹{averagePrice.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Add New Product Section */}
      <div className="add-product-section">
        <h3>Add New Product</h3>
        <div className="add-product-form">
          <input
            type="text"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            placeholder="Product name..."
            className="product-input"
          />
          <input
            type="number"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
            placeholder="Price (₹)"
            className="product-input price-input"
          />
          <button onClick={handleAddProduct} className="btn btn-add">
            ➕ Add Product
          </button>
        </div>
      </div>

      {/* Product List - Child Component receiving memoized delete function */}
      <ProductList 
        products={filteredProducts} 
        onRemoveProduct={handleRemoveProduct}
      />
    </div>
  );
};

export default ProductSearchAndCalculator;