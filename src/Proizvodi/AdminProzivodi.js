import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminProizvodi.css'; // Stilovi za tabelu i input polja

const AdminProizvodi = () => {
    const [proizvodi, setProizvodi] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch proizvoda iz baze
        const fetchProizvodi = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/proizvodi');
                setProizvodi(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Greška pri preuzimanju proizvoda:', error);
                setLoading(false);
            }
        };

        fetchProizvodi();
    }, []);

    const handleInputChange = (e, id) => {
        const { name, value } = e.target;
        setProizvodi(proizvodi.map(proizvod =>
            proizvod.id === id ? { ...proizvod, [name]: value } : proizvod
        ));
    };

    const handleSave = async (id) => {
        try {
            const proizvod = proizvodi.find(p => p.id === id);
            await axios.put(`http://localhost:5000/api/proizvodi/${id}`, proizvod);
            alert('Proizvod uspešno ažuriran!');
        } catch (error) {
            console.error('Greška pri ažuriranju proizvoda:', error);
        }
    };
    

    if (loading) {
        return <p>Učitavanje...</p>;
    }
    return (
        <div className="admin-proizvodi-container">
            <h1>Administracija Proizvoda</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ime</th>
                        <th>Opis</th>
                        <th>Količina</th>
                        <th>Cena</th>
                        <th>Slika URL</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {proizvodi.map(proizvod => (
                        <tr key={proizvod.id}>
                            <td>{proizvod.id}</td>
                            <td><input type="text" name="ime" value={proizvod.ime} onChange={(e) => handleInputChange(e, proizvod.id)} /></td>
                            <td><input type="text" name="opis" value={proizvod.opis} onChange={(e) => handleInputChange(e, proizvod.id)} /></td>
                            <td><input type="number" name="kolicina" value={proizvod.kolicina} onChange={(e) => handleInputChange(e, proizvod.id)} /></td>
                            <td><input type="number" name="cena" value={proizvod.cena} onChange={(e) => handleInputChange(e, proizvod.id)} /></td>
                            <td><input type="text" name="slika" value={proizvod.slika} onChange={(e) => handleInputChange(e, proizvod.id)} /></td>
                            <td>
                                <button onClick={() => handleSave(proizvod.id)}>Sačuvaj</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProizvodi;
