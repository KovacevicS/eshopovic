import React, { useState } from 'react';
import axios from 'axios';

const DodajProizvod = () => {
    const [imeProizvoda, setImeProizvoda] = useState('');
    const [opisProizvoda, setOpisProizvoda] = useState('');
    const [cenaProizvoda, setCenaProizvoda] = useState('');
    const [slikaProizvoda, setSlikaProizvoda] = useState('');
    const [poruka, setPoruka] = useState('');

    const dodajProizvod = () => {
        axios.post('http://localhost:5000/api/proizvodi', {
            ime: imeProizvoda,
            opis: opisProizvoda,
            cena: cenaProizvoda,
            slika: slikaProizvoda
        })
        .then(response => {
            setPoruka('Proizvod je uspešno dodat!');
            setImeProizvoda('');
            setOpisProizvoda('');
            setCenaProizvoda('');
            setSlikaProizvoda('');
        })
        .catch(error => {
            setPoruka('Greška prilikom dodavanja proizvoda: ' + error.message);
        });
    };

    return (
        <div>
            <h2>Dodaj novi proizvod</h2>
            <input
                type="text"
                placeholder="Ime proizvoda"
                value={imeProizvoda}
                onChange={e => setImeProizvoda(e.target.value)}
            />
            <input
                type="text"
                placeholder="Opis proizvoda"
                value={opisProizvoda}
                onChange={e => setOpisProizvoda(e.target.value)}
            />
            <input
                type="number"
                placeholder="Cena proizvoda"
                value={cenaProizvoda}
                onChange={e => setCenaProizvoda(e.target.value)}
            />
            <input
                type="text"
                placeholder="URL slike proizvoda"
                value={slikaProizvoda}
                onChange={e => setSlikaProizvoda(e.target.value)}
            />
            <button onClick={dodajProizvod}>Dodaj proizvod</button>
            {poruka && <p>{poruka}</p>}
        </div>
    );
};

export default DodajProizvod;
