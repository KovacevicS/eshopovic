import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <header className="navbar">
      <div className="logo">My E-Shop</div>
      <div className={`nav ${isNavActive ? 'active' : ''}`}>
        <nav>
          <ul>
            <li><Link to="/">Početna</Link></li>
            <li><Link to="/proizvodi">Proizvodi</Link></li>
            <li><Link to="/korpa">Korpa</Link></li>
          </ul>
        </nav>
        <div className="menu-toggle" onClick={toggleNav}>
          &#9776; {/* Hamburger icon */}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
