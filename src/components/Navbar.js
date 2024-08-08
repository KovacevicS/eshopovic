// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <h2 style={styles.title}>My E-Shop</h2>
            <ul style={styles.navLinks}>
                <li>
                    <Link to="/" style={styles.link}>Početna</Link>
                </li>
                <li>
                    <Link to="/proizvodi" style={styles.link}>Proizvodi</Link>
                </li>
                <li>
                    <Link to="/korpa" style={styles.link}>Korpa</Link>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
    },
    title: {
        margin: 0,
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
    },
    link: {
        marginLeft: '20px',
        color: '#fff',
        textDecoration: 'none',
        fontSize: '18px',
    }
};

export default Navbar;
