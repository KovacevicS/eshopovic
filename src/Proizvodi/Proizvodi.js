import React, { useState } from 'react';

const Tabela = ({ proizvodi = [], updateProizvod }) => { // Postavi podrazumevanu vrednost za `proizvodi`
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
        <table>
          <thead>
            <tr>
              <th>Ime proizvoda</th>
              <th>Opis proizvoda</th>
              <th>Cena proizvoda</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {proizvodi.map((proizvod, index) => (
              <tr key={index}>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedProizvodkName}
                      onChange={(e) => setEditedProizvodName(e.target.value)}
                    />
                  ) : (
                    proizvod.ime
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedProizvodDescription}
                      onChange={(e) => setEditedProizvodDescription(e.target.value)}
                    />
                  ) : (
                    proizvod.opis
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedProizvodCena}
                      onChange={(e) => setEditedProizvodCena(e.target.value)}
                    />
                  ) : (
                    `${proizvod.cena}rsd`
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <button onClick={() => handleSacuvaj(index)}>Sačuvaj</button>
                  ) : (
                    <button onClick={() => handleEdit(index, proizvod)}>Uredi</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    );
};

export default Tabela;
