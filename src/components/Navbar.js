import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../login/auth'; // Uvoz useAuth za dobijanje informacija o korisniku
import './Navbar.css';

const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const { user, logout } = useAuth(); // Dohvatanje korisničkih informacija i logout funkcije

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
            {user && user.uloga === 'admin' && (
              <>
                <li><Link to="/dodaj-proizvod">Dodaj Proizvod</Link></li>
                <li><Link to="/adminproizvodi">Admin</Link></li>
              </>
            )}
            {!user ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            ) : (
              <li><button onClick={logout} className="logout-button">Logout</button></li>
            )}
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
