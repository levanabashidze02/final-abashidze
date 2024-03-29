import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const searchTerm = query.get('id');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      fetch(`https://fakestoreapi.com/products/${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          if (data.id) {
            setSearchResults([data]);
          } else {
            setSearchResults([]);
          }
        })
        .catch(error => console.error('Error fetching search results:', error));
    }
  }, [searchTerm]);

  return (
    <div className="product-list">
      <h1>Search Results for Product ID: {searchTerm}</h1>
      {searchResults ? (
        <div className="products">
          {searchResults.map(product => (
            <div key={product.id} className="product">
              <h2>{product.title}</h2>
              <img src={product.image} alt={product.title} />
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No product found with ID: {searchTerm}</p>
      )}
    </div>
  );
}

export default SearchResults;
