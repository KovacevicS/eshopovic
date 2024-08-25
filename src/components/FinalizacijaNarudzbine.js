import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './FinalizacijaNarudzbine.css';

const FinalizacijaNarudzbine = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [transakcijaData, setTransakcijaData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (state && state.korpa) {
            setTransakcijaData({
                ime: state.ime,
                prezime: state.prezime,
                email: state.email,
                adresa: state.adresa,
                telefon: state.telefon,
                datum_transakcije: new Date().toISOString(),
                izabranih_proizvoda: state.korpa.length,  // Broj izabranih proizvoda
                proizvodi: state.korpa.map(proizvod => ({
                    id: proizvod.id,
                    ime: proizvod.ime,
                    cena: proizvod.cena,
                    kolicina: proizvod.kolicina,
                    popust: proizvod.popust || proizvod.cena // Ako postoji popust, koristite ga, inače redovna cena
                }))
            });
            setLoading(false);
        } else {
            navigate('/korpa'); // Ako nema podataka, vrati na stranicu sa korpom
        }
    }, [state, navigate]);

    const handleZavrsiNarudzbinu = async () => {
        try {
            const { ime, prezime, email, adresa, telefon, datum_transakcije, proizvodi } = transakcijaData;
    
            if (!ime || !prezime || !email || !adresa || !telefon || !datum_transakcije || !proizvodi) {
                throw new Error('Neka obavezna polja nedostaju');
            }
    
            // Konvertovanje ISO 8601 datuma u MySQL DATETIME format
            const formattedDate = new Date(datum_transakcije).toISOString().slice(0, 19).replace('T', ' ');
    
            const dataToSend = {
                ...transakcijaData,
                datum_transakcije: formattedDate,
            };
    
            console.log('Podaci koji se šalju:', dataToSend);
    
            await axios.post('http://localhost:5000/api/transakcije', dataToSend);
    
            // Ažuriranje količine proizvoda
            for (const proizvod of proizvodi) {
                await axios.put(`http://localhost:5000/api/proizvodi/${proizvod.id}`, {
                    kolicina: proizvod.kolicina - proizvodi.kolicina
                });
            }
    
        } catch (error) {
            console.error('Greška pri slanju podataka:', error);
            console.log('Detalji greške:', error.response?.data);
        }
    };
    
    if (loading) {
        return <p>Učitavanje...</p>;
    }

    return (
        <div className="finalizacija-narudzbine-container">
            <h1>Finalizacija Narudžbine</h1>
            <h2>Vaši Podaci</h2>
            <div className="user-info">
                <p><i className="fas fa-user"></i> Ime: {transakcijaData.ime}</p>
                <p><i className="fas fa-user"></i> Prezime: {transakcijaData.prezime}</p>
                <p><i className="fas fa-envelope"></i> Email: {transakcijaData.email}</p>
                <p><i className="fas fa-map-marker-alt"></i> Adresa: {transakcijaData.adresa}</p>
                <p><i className="fas fa-phone"></i> Telefon: {transakcijaData.telefon}</p>
            </div>

            <h2>Vaša Narudžbina</h2>
            <div className="order-info">
                <ul>
                    {transakcijaData.proizvodi && transakcijaData.proizvodi.map((proizvod) => (
                        <li key={proizvod.id} className="proizvod-card">
                            <strong>{proizvod.ime}</strong><br />
                            Cena: {proizvod.popust} RSD<br />
                            Količina: {proizvod.kolicina}
                        </li>
                    ))}
                </ul>
                <p>Ukupno izabranih proizvoda: {transakcijaData.izabranih_proizvoda}</p>
            </div>

            <button onClick={handleZavrsiNarudzbinu}>Završi</button>
        </div>
    );
};

export default FinalizacijaNarudzbine;