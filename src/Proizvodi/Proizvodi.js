import React, { useState } from 'react';
import axios from 'axios';
import './Proizvodi.css'; // Povezivanje CSS fajla
import PropTypes from 'prop-types';

const Tabela = ({ proizvodi = [], updateProizvod }) => { // Default value for proizvodi
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedProizvodName, setEditedProizvodName] = useState('');
    const [editedProizvodDescription, setEditedProizvodDescription] = useState('');
    const [editedProizvodCena, setEditedProizvodCena] = useState('');

    const handleEdit = (index, proizvod) => {
        setEditingIndex(index);
        setEditedProizvodName(proizvod.ime);
        setEditedProizvodDescription(proizvod.opis);
        setEditedProizvodCena(proizvod.cena);
    };

    const handleSacuvaj = async (index) => {
        const updatedProizvod = {
            ime: editedProizvodName,
            opis: editedProizvodDescription,
            cena: editedProizvodCena,
        };

        try {
            await axios.put(`http://localhost:5000/api/proizvodi/${proizvodi[index].id}`, updatedProizvod); // URL za ažuriranje proizvoda
            updateProizvod(index, updatedProizvod.ime, updatedProizvod.opis, updatedProizvod.cena);
            setEditingIndex(null);
        } catch (error) {
            console.error('Greška pri ažuriranju proizvoda:', error);
        }
    };

    return (
        <div className="proizvodi-container">
            {proizvodi.map((proizvod, index) => (
                <div key={index} className="proizvod-kartica">
                    {editingIndex === index ? (
                        <>
                            <input
                                type="text"
                                value={editedProizvodName}
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
                            <img src={proizvod.slika} alt={proizvod.ime} />
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

Tabela.propTypes = {
    proizvodi: PropTypes.array,
    updateProizvod: PropTypes.func.isRequired,
};

export default Tabela;
