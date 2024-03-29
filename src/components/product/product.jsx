import React from "react";
import { Link } from "react-router-dom";
import "./product.css";

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-details">
        <Link to={`/product/${product.id}`} className="product-link">
          <h3>{product.title}</h3>
        </Link>
        <p>${product.price}</p>
        <p>Product Code: <strong>{product.id}</strong></p>
      </div>
        <Link to={`/product/${product.id}`}>
        <div className="fav-button">
          Read More
          </div>
        </Link>

    </div>
  );
};

export default Product;
