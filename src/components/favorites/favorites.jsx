import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../product/product';

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const favoriteProductIds = JSON.parse(localStorage.getItem(`favoriteProducts_${userId}`)) || [];
      fetchFavoriteProducts(favoriteProductIds);
    }
  }, [navigate]);

  const fetchFavoriteProducts = (productIds) => {
    Promise.all(
      productIds.map((id) =>
        fetch(`https://fakestoreapi.com/products/${id}`)
          .then((response) => response.json())
      )
    )
    .then((products) => {
      setFavoriteProducts(products);
    })
    .catch((error) => console.error('Error fetching favorite products:', error));
  };

  const handleRemoveFromFavorites = (productId) => {
    const userId = localStorage.getItem('userId');
    const updatedFavorites = favoriteProducts.filter((product) => product.id !== productId);
    localStorage.setItem(`favoriteProducts_${userId}`, JSON.stringify(updatedFavorites.map((product) => product.id)));
    setFavoriteProducts(updatedFavorites);
  };

  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <div className="favorites-grid">
        {favoriteProducts.length === 0 ? (
          <p>There are no favorites.</p>
        ) : favoriteProducts.map((product) => (
          <div key={product.id} className="favorite-product">
            <Product product={product} showButton={false} />
            <button onClick={() => handleRemoveFromFavorites(product.id)} className="fav-button">
              Remove {product.title} from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
