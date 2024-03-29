// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../assets/searchicon';
import "./header.css";

function Header() {
  const tokenTrue = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Remove userId on logout
    window.location.href = '/';
  };

  return (
    <nav className="header">
      <div className="header_navigation">
        <input 
          type='text' 
          className="search" 
          placeholder="Search..."
        />
        <button className="search-link">
          <SearchIcon className="search-icon" />
        </button>
      </div>
      <Link to="/" className="loglink">
        <div className="button">Home</div>
      </Link>
      {tokenTrue ? (
        <>
          <div className="button" onClick={handleLogout}>Logout</div>
          <Link to="/favorites" className="loglink">
            <div className="button">Favorites</div>
          </Link>
        </>
      ) : (
        <Link to="/login" className="loglink">
          <div className="button">Login</div>
        </Link>
      )}
    </nav>
  );
}

export default Header;
