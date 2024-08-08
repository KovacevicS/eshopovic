// src/components/DeleteProizvoda.js
import React from 'react';
import { useParams } from 'react-router-dom';

const DeleteProizvoda = () => {
    const { id } = useParams(); // Id proizvoda iz URL-a

    const handleDelete = () => {
        // Logika za brisanje proizvoda
        console.log(`Obriši proizvod ID: ${id}`);
    };

    return (
        <div>
            <h1>Obriši Proizvod</h1>
            <p>Da li ste sigurni da želite da obrišete proizvod ID: {id}?</p>
            <button onClick={handleDelete}>Da, Obriši</button>
        </div>
    );
};

export default DeleteProizvoda;
