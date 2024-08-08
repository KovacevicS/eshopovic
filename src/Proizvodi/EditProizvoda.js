// src/components/EditProizvoda.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const EditProizvoda = () => {
    const { id } = useParams(); // Id proizvoda iz URL-a
    const [naziv, setNaziv] = useState('');
    const [cena, setCena] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logika za ažuriranje proizvoda
        console.log(`Ažuriraj proizvod ID: ${id}, naziv: ${naziv}, cena: ${cena} RSD`);
    };

    return (
        <div>
            <h1>Izmeni Proizvod</h1>
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
                <button type="submit">Sačuvaj Izmene</button>
            </form>
        </div>
    );
};

export default EditProizvoda;
