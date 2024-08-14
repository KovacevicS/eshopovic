import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Korpa.css'; // Import CSS

const Korpa = ({ korpa, ukloniIzKorpe }) => {
    const navigate = useNavigate();

    const handleRemove = (id) => {
        ukloniIzKorpe(id);
    };

    const handleCheckout = () => {
        // Navigacija na stranicu za plaćanje
        navigate('/checkout');
    };

    return (
        <div className="korpa-container">
            <h1 className="korpa-header">Vaša Korpa</h1>
            {korpa.length === 0 ? (
                <p className="korpa-empty">Vaša korpa je prazna.</p>
            ) : (
                <ul className="korpa-list">
                    {korpa.map(proizvod => (
                        <li key={proizvod.id} className="korpa-item">
                            {proizvod.ime} - {proizvod.cena} RSD
                            <button 
                                className="korpa-remove-button"
                                onClick={() => handleRemove(proizvod.id)}
                            >
                                Ukloni
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button 
                className="korpa-checkout-button"
                onClick={handleCheckout}
            >
                Nastavi na plaćanje
            </button>
        </div>
    );
};

export default Korpa;
