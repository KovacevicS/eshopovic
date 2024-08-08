import React from 'react';
import './Pocetna.css';

const Pocetna = () => {
  return (
    <div className="pocetna-container">
        

      <section className="hero-section">
        <h1>Dobro dosli na E-Shop</h1>
        <p>Your one-stop shop for the best products.</p>
        <button className="shop-now-btn">Shop Now</button>
      </section>

      <section className="featured-products">
        <h2>Najnoviji Proizvodi</h2>
        <div className="product-list">
          <div className="product-item">Product 1</div>
          <div className="product-item">Product 2</div>
          <div className="product-item">Product 3</div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 My E-Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Pocetna;
