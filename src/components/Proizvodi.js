// src/components/Proizvodi.js
import React, { useState, useEffect } from 'react';

const Proizvodi = () => {
    const [proizvodi, setProizvodi] = useState([]);

    useEffect(() => {
        // Simulacija fetch-ovanja proizvoda
        const fetchedProizvodi = [
            { id: 1, naziv: 'Proizvod 1', cena: 100 },
            { id: 2, naziv: 'Proizvod 2', cena: 150 },
            { id: 3, naziv: 'Proizvod 3', cena: 200 },
        ];
        setProizvodi(fetchedProizvodi);
    }, []);

    return (
        <div>
            <h1>Proizvodi</h1>
            <ul>
                {proizvodi.map(proizvod => (
                    <li key={proizvod.id}>
                        {proizvod.naziv} - {proizvod.cena} RSD
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Proizvodi;
