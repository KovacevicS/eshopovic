// src/components/Korpa.js
import React, { useState } from 'react';

const Korpa = () => {
    const [korpa, setKorpa] = useState([]);

    const handleRemove = (id) => {
        setKorpa(korpa.filter(proizvod => proizvod.id !== id));
    };

    const handleAddMore = () => {
        // Navigacija na stranicu sa proizvodima
        // Možemo koristiti `useNavigate` iz React Router-a
    };

    const handleCheckout = () => {
        // Logika za plaćanje
        console.log('Nastavi na plaćanje');
    };

    return (
        <div>
            <h1>Vaša Korpa</h1>
            <ul>
                {korpa.map(proizvod => (
                    <li key={proizvod.id}>
                        {proizvod.naziv} - {proizvod.cena} RSD
                        <button onClick={() => handleRemove(proizvod.id)}>Ukloni</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddMore}>Dodaj još proizvoda</button>
            <button onClick={handleCheckout}>Nastavi na plaćanje</button>
        </div>
    );
};

export default Korpa;
