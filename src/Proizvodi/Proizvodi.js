import React, { useState } from 'react';
import './Proizvodi.css'; // Povezivanje CSS fajla

const Tabela = ({ proizvodi = [{ime:"patike", cena:"15000", opis:"dobre patike",slika:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9-2yTBhji-ruZOZhP7GVt7gAKJT1071asA&s"},
  {ime:"majica", cena:"5000", opis: "dodjos majica", slika:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVma2-6Nuct93gCsgIq6X63_EPJWpRgHRC1w&s"}], updateProizvod }) => { 
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedProizvodkName, setEditedProizvodName] = useState('');
    const [editedProizvodDescription, setEditedProizvodDescription] = useState('');
    const [editedProizvodCena, setEditedProizvodCena] = useState('');

    const handleEdit = (index, proizvod) => {
        setEditingIndex(index);
        setEditedProizvodName(proizvod.ime);
        setEditedProizvodDescription(proizvod.opis);
        setEditedProizvodCena(proizvod.cena);
    };

    const handleSacuvaj = (index) => {
        updateProizvod(index, editedProizvodkName, editedProizvodDescription, editedProizvodCena);
        setEditingIndex(null);
    };

    return (
        <div className="proizvodi-container">
            {proizvodi.map((proizvod, index) => (
                <div key={index} className="proizvod-kartica">
                    {editingIndex === index ? (
                        <>
                            <input
                                type="text"
                                value={editedProizvodkName}
                                onChange={(e) => setEditedProizvodName(e.target.value)}
                                className="proizvod-input"
                            />
                            <input
                                type="text"
                                value={editedProizvodDescription}
                                onChange={(e) => setEditedProizvodDescription(e.target.value)}
                                className="proizvod-input"
                            />
                            <input
                                type="text"
                                value={editedProizvodCena}
                                onChange={(e) => setEditedProizvodCena(e.target.value)}
                                className="proizvod-input"
                            />
                            <button onClick={() => handleSacuvaj(index)} className="sacuvaj-button">Sačuvaj</button>
                        </>
                    ) : (
                        <>
                            <h3 className="proizvod-ime">{proizvod.ime}</h3>
                            <img src={proizvod.slika}/>
                            <p className="proizvod-opis">{proizvod.opis}</p>
                            <p className="proizvod-cena">{proizvod.cena} RSD</p>
                            <button onClick={() => handleEdit(index, proizvod)} className="uredi-button">Uredi</button>
                            <button>Vise o proizvodu</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Tabela;
