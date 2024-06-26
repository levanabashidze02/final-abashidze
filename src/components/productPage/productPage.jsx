import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./productPage.css";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); 
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));

    const userId = localStorage.getItem('userId');
    const favoriteProducts = JSON.parse(localStorage.getItem(`favoriteProducts_${userId}`)) || [];
    const productId = parseInt(id); 
    setIsFavorite(favoriteProducts.includes(productId)); 
  }, [id]);

  const handleAddToFavorites = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); 
    if (token) { 
      const favoriteProducts = JSON.parse(localStorage.getItem(`favoriteProducts_${userId}`)) || [];
      const productId = parseInt(id); 
      if (!favoriteProducts.includes(productId)) {
        favoriteProducts.push(productId);
        localStorage.setItem(`favoriteProducts_${userId}`, JSON.stringify(favoriteProducts));
        setIsFavorite(true); 
        console.log("Product added to favorites:", productId);
        window.alert(`${product.title} was added to favorites!`);
      } else {
        window.alert(`${product.title} is already in favorites!`);
      }
    } else {
      window.alert("Please log in to add the product to favorites.");
      window.location.href = '/login';
    }
  };

  const handleRemoveFromFavorites = () => {
    const userId = localStorage.getItem('userId');
    const favoriteProducts = JSON.parse(localStorage.getItem(`favoriteProducts_${userId}`)) || [];
    const productId = parseInt(id); 
    const updatedFavorites = favoriteProducts.filter(prodId => prodId !== productId);
    localStorage.setItem(`favoriteProducts_${userId}`, JSON.stringify(updatedFavorites));
    setIsFavorite(false); 
    console.log("Product removed from favorites:", productId);
    window.alert(`${product.title} was removed from favorites!`);
  };

  return (
    <div className="product-page">
      {product ? (
        <>
          <h2>{product.title}</h2>
          <img src={product.image} alt={product.title} />
          <p>{product.description}</p>
          <p>${product.price}</p>
          {isFavorite ? (
            <button className="fav-button" onClick={handleRemoveFromFavorites}>Remove from Favorites</button>
          ) : (
            <button className="fav-button" onClick={handleAddToFavorites}>Add to Favorites</button>
          )}
        </>
      ) : (
        <p>Not a valid product.</p>
      )}
    </div>
  );
};

export default ProductPage;
