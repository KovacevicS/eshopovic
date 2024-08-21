import React, { useState } from 'react';
import axios from 'axios';
import './DodajProizvod.css';

const DodajProizvod = () => {
    const [imeProizvoda, setImeProizvoda] = useState('');
    const [opisProizvoda, setOpisProizvoda] = useState('');
    const [cenaProizvoda, setCenaProizvoda] = useState('');
    const [slikaProizvoda, setSlikaProizvoda] = useState(null); // Promenjeno u null za fajl
    const [poruka, setPoruka] = useState('');

    const dodajProizvod = () => {
        const formData = new FormData();
        formData.append('ime', imeProizvoda);
        formData.append('opis', opisProizvoda);
        formData.append('cena', cenaProizvoda);
        if (slikaProizvoda) {
            formData.append('slika', slikaProizvoda);
        }

        axios.post('http://localhost:5000/api/proizvodi', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setPoruka('Proizvod je uspešno dodat!');
            setImeProizvoda('');
            setOpisProizvoda('');
            setCenaProizvoda('');
            setSlikaProizvoda(null);
        })
        .catch(error => {
            setPoruka('Greška prilikom dodavanja proizvoda: ' + error.message);
        });
    };

    return (
        <div className="dodaj-proizvod-container">
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
                id='dodavanjeslike'
                type="file"
                onChange={e => setSlikaProizvoda(e.target.files[0])} // Čuvamo fajl u state
            />
            {/* <label htmlFor='dodavanjeslike' className="custom-file-upload" onChange={e => setSlikaProizvoda(e.target.files[0])} typef>
                Izaberi sliku
            </label> */}
            <button onClick={dodajProizvod}>Dodaj proizvod</button>
            {poruka && <p className={poruka.includes('uspešno') ? 'success' : 'error'}>{poruka}</p>}
        </div>
    );
};

export default DodajProizvod;
