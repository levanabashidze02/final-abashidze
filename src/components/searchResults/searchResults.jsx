import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Product from '../product/product';

const SearchResults = () => {
  const [searchedProducts, setSearchedProducts] = useState([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('title') || '';
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(20);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        const filteredProducts = data.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
        setSearchedProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 20); // 
  };

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : searchedProducts.length > 0 ? (
        <>
          <div className="search-results-list">
            {searchedProducts.slice(0, displayCount).map(product => (
              <Product key={product.id} product={product} />
            ))}
          </div>
          {displayCount < searchedProducts.length && (
            <button onClick={handleLoadMore}>Load More</button>
          )}
        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
