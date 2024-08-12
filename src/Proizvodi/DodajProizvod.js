import React, { useState } from 'react';
import Tabela from './Proizvodi'; // Ako je Tabela.js u istom direktorijumu

const DodajProizvod = () => {
    const [imeProizvoda, setImeProizvoda] = useState('');
    const [opisProizvoda, setOpisProizvoda] = useState('');
    const [cenaProizvoda, setCenaProizvoda] = useState('');
    const [slikaProizvoda, setSlikaProizvoda] = useState('');
    const [proizvodi, setProizvodi] = useState([]);

    const handlePromenaImena = (e) => {
        setImeProizvoda(e.target.value);
    };

    const handlePromenaOpisa = (e) => {
        setOpisProizvoda(e.target.value);
    };

    const handlePromenaCene = (e) => {
        setCenaProizvoda(e.target.value);
    };

    const dodajProizvode = () => {
        if (imeProizvoda.trim() && opisProizvoda.trim()) {
            const noviProizvod = { ime: imeProizvoda, opis: opisProizvoda, cena: cenaProizvoda, slika: slikaProizvoda };
            setProizvodi([...proizvodi, noviProizvod]);
            setImeProizvoda('');
            setOpisProizvoda('');
            setCenaProizvoda('');
            setSlikaProizvoda('');
        }
    };

    const updateProizvod = (index, newName, newDescription, newCena) => {
        const azuriraniProizvodi = proizvodi.map((proizvod, i) =>
            i === index ? { ime: newName, opis: newDescription, cena: newCena } : proizvod
        );
        setProizvodi(azuriraniProizvodi);
    };

    return (
        <div>
            <h1>Proizvodi</h1>
            <input
                type="text"
                placeholder="Ime proizvoda"
                value={imeProizvoda}
                onChange={handlePromenaImena}
            />
            <input
                type="text"
                placeholder="Opis proizvoda"
                value={opisProizvoda}
                onChange={handlePromenaOpisa}
            />
            <input
                type="number"
                placeholder="Cena proizvoda"
                value={cenaProizvoda}
                onChange={handlePromenaCene}
            />
            <button onClick={dodajProizvode}>Dodaj Proizvod</button>
            <Tabela proizvodi={proizvodi} updateProizvod={updateProizvod} />
        </div>
    );
}

export default DodajProizvod;
