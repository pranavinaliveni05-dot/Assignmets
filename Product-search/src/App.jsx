 import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './App.css';

// Child Component - Displays product information
const ProductList = React.memo(({ products, onRemoveProduct }) => {
  console.log("ProductList rendered");
  
  return (
    <div className="product-list">
      <h3>Product List ({products.length})</h3>
      {products.length === 0 ? (
        <p className="empty-message">No products found.</p>
      ) : (
        <ul className="list-unstyled">
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
  
  const [searchTerm, setSearchTerm] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      document.title = 'Product Search - All Products';
    } else {
      document.title = `Searching: "${searchTerm}" - Product Dashboard`;
    }
    return () => {
      document.title = 'Product Search and Price Calculator';
    };
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    if (searchTerm.trim() === '') {
      return products;
    }
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const totalPrice = useMemo(() => {
    console.log("Calculating total price...");
    return filteredProducts.reduce((total, product) => total + product.price, 0);
  }, [filteredProducts]);

  const averagePrice = useMemo(() => {
    console.log("Calculating average price...");
    if (filteredProducts.length === 0) return 0;
    return totalPrice / filteredProducts.length;
  }, [filteredProducts, totalPrice]);

  const productCount = useMemo(() => {
    console.log("Calculating product count...");
    return filteredProducts.length;
  }, [filteredProducts]);

  const handleRemoveProduct = useCallback((indexToRemove) => {
    setProducts(prevProducts =>
      prevProducts.filter((_, index) => index !== indexToRemove)
    );
  }, []);

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
      id: Date.now(),
      name: trimmedName,
      price: price
    };
    
    setProducts(prevProducts => [...prevProducts, newProduct]);
    setNewProductName('');
    setNewProductPrice('');
    
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      focusSearchInput();
    }
  };

  return (
    <div className="container py-4">
      <div className="dashboard">
        <h1>🛍️ Product Search & Price Calculator</h1>
        
        {/* Search Section - Bootstrap grid added */}
        <div className="search-section mb-4">
          <div className="search-container row g-2">
            <div className="col-md-8">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                placeholder="🔍 Search products by name..."
                className="search-input w-100"
              />
            </div>
            <div className="col-md-2">
              <button onClick={clearSearch} className="btn btn-clear w-100">
                Clear
              </button>
            </div>
            <div className="col-md-2">
              <button onClick={focusSearchInput} className="btn btn-focus w-100">
                Focus Search
              </button>
            </div>
          </div>
          {searchTerm && (
            <p className="search-result-info mt-2">
              Showing results for: <strong>"{searchTerm}"</strong>
            </p>
          )}
        </div>
        
        {/* Statistics Section - Bootstrap grid added */}
        <div className="stats-container row g-3 mb-4">
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <h3>Products Found</h3>
                <p className="stat-value">{productCount}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <h3>Total Price</h3>
                <p className="stat-value">₹{totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-info">
                <h3>Average Price</h3>
                <p className="stat-value">₹{averagePrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add New Product Section - Bootstrap grid added */}
        <div className="add-product-section mb-4">
          <h3>Add New Product</h3>
          <div className="add-product-form row g-2">
            <div className="col-md-5">
              <input
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="Product name..."
                className="product-input w-100"
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                placeholder="Price (₹)"
                className="product-input price-input w-100"
              />
            </div>
            <div className="col-md-3">
              <button onClick={handleAddProduct} className="btn btn-add w-100">
                ➕ Add Product
              </button>
            </div>
          </div>
        </div>
        
        {/* Product List - Child Component */}
        <ProductList
          products={filteredProducts}
          onRemoveProduct={handleRemoveProduct}
        />
      </div>
    </div>
  );
};

export default ProductSearchAndCalculator;