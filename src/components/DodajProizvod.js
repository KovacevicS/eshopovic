// src/components/DodajProizvod.js
import React, { useState } from 'react';

const DodajProizvod = () => {
    const [naziv, setNaziv] = useState('');
    const [cena, setCena] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logika za dodavanje proizvoda
        console.log(`Dodaj proizvod: ${naziv}, ${cena} RSD`);
        // Reset forme
        setNaziv('');
        setCena('');
    };

    return (
        <div>
            <h1>Dodaj novi proizvod</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Naziv:</label>
                    <input 
                        type="text" 
                        value={naziv} 
                        onChange={(e) => setNaziv(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Cena:</label>
                    <input 
                        type="number" 
                        value={cena} 
                        onChange={(e) => setCena(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Dodaj Proizvod</button>
            </form>
        </div>
    );
};

export default DodajProizvod;
