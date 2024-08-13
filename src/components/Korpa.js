import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h1>Vaša Korpa</h1>
            {korpa.length === 0 ? (
                <p>Vaša korpa je prazna.</p>
            ) : (
                <ul>
                    {korpa.map(proizvod => (
                        <li key={proizvod.id}>
                            {proizvod.ime} - {proizvod.cena} RSD
                            <button onClick={() => handleRemove(proizvod.id)}>Ukloni</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleCheckout}>Nastavi na plaćanje</button>
        </div>
    );
};

export default Korpa;
