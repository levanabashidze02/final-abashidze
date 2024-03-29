import React, { useState, useEffect } from 'react';
import "./home.css";
import Product from '../product/product'; 

function Home() {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(18); // სულ 20 არის API-ში

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleLoadMore = () => {
        setVisibleProducts(prev => prev + 20);
    };

    return (
        <>
            <div className="home-cont">
                <img className="banner-image" alt="Banner Image" src="https://tmssl.akamaized.net/images/foto/galerie/budu-zivzivadze-ksc-2023-24-1707572612-129025.jpg?lm=1707572625" />
                <div className="banner-text">Budu Shop</div>

            </div>
            <div className="home-list">
                <h2>Products</h2>
                <div className="product-grid">
                    {products.slice(0, visibleProducts).map(product => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
                {visibleProducts < products.length && (
                    <button className="load-more-button" onClick={handleLoadMore}>
                        Load More
                    </button>
                )}
            </div>
        </>
    );
}

export default Home;
