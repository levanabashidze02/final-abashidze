import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./productPage.css";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleAddToFavorites = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) { // Check if token is present
      const favoriteProducts = JSON.parse(localStorage.getItem(`favoriteProducts_${userId}`)) || [];
      const productId = parseInt(id); // Convert product ID to a number
      if (!favoriteProducts.includes(productId)) {
        favoriteProducts.push(productId);
        localStorage.setItem(`favoriteProducts_${userId}`, JSON.stringify(favoriteProducts));
        console.log("Product added to favorites:", productId);
        window.alert(`${product.title} was added to favorites!`);
      } else {
        window.alert(`${product.title} is already in favorites!`);
      }
    } else {
      // Display alert to prompt user to log in
      window.alert("Please log in to add the product to favorites.");
    }
  };

  return (
    <div className="product-page">
      {product ? (
        <>
          <h2>{product.title}</h2>
          <img src={product.image} alt={product.title} />
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button className="fav-button" onClick={handleAddToFavorites}>Add to Favorites</button>
        </>
      ) : (
        <p>Not a valid product.</p>
      )}
    </div>
  );
};

export default ProductPage;
