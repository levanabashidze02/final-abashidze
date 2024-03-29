import React from 'react';
import './App.css';
import Header from "./components/header/header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/login/login";
import Home from "./components/home/home";
import ProductPage from "./components/productPage/productPage"; 
import SearchResults from './components/searchResults/searchResults';
import Favorites from './components/favorites/favorites';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/search" element={<SearchResults />} /> 
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
