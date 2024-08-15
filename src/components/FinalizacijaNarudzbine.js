import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './FinalizacijaNarudzbine.css';
import { useAuth } from '../login/auth';

const FinalizacijaNarudzbine = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [transakcijaData, setTransakcijaData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (state && state.korpa) {
            setTransakcijaData({
                ...state,
                ime: user.ime || state.ime,
                prezime: user.prezime || state.prezime,
                email: user.email || state.email,
                adresa: user.adresa || state.adresa,
                telefon: user.telefon || state.telefon
            });
            setLoading(false);
        } else {
            navigate('/korpa'); // Ako nema podataka, vrati na stranicu sa korpom
        }
    }, [state, navigate, user]);
    

    const handleZavrsiNarudzbinu = async () => {
        try {
            console.log('Sending data:', {
                id: user.id,
                proizvodi: transakcijaData.korpa.map(proizvod => ({
                    ime: proizvod.ime,
                    cena: proizvod.cena,
                    kolicina: proizvod.kolicina
                })),
                ime: transakcijaData.ime,
                prezime: transakcijaData.prezime,
                adresa: transakcijaData.adresa,
                email: transakcijaData.email,
                telefon: transakcijaData.telefon,
                datum_transakcije: new Date().toISOString(), // Dodaje trenutni datum i vreme
            });
    
            await axios.post('http://localhost:5000/api/transakcije', {
                id: user.id,
                proizvodi: transakcijaData.korpa.map(proizvod => ({
                    id: proizvod.id,
                    ime: proizvod.ime,
                    cena: proizvod.cena,
                    kolicina: proizvod.kolicina
                })),
                ime: transakcijaData.ime,
                prezime: transakcijaData.prezime,
                adresa: transakcijaData.adresa,
                email: transakcijaData.email,
                telefon: transakcijaData.telefon,
                datum_transakcije: new Date().toISOString(), // Dodaje trenutni datum i vreme
            });
            navigate('/zahvalnica'); // Nakon uspešnog slanja, preusmeri na stranicu sa zahvalnicom
        } catch (error) {
            console.error('Greška pri slanju podataka:', error);
        }
    };
    
    if (loading) {
        return <p>Učitavanje...</p>;
    }
console.log(transakcijaData)
    return (
        <div className="finalizacija-narudzbine-container">
            <h1>Finalizacija Narudžbine</h1>
            <h2>Vaši Podaci</h2>
            <p>Ime: {transakcijaData.ime}</p>
            <p>Prezime: {transakcijaData.prezime}</p>
            <p>Email: {transakcijaData.email}</p>
            <p>Adresa: {transakcijaData.adresa}</p>

            <h2>Vaša Narudžbina</h2>
            <ul>
                {transakcijaData.korpa && transakcijaData.korpa.map((proizvod) => (
                    <li key={proizvod.id}>
                        {proizvod.ime} - {proizvod.cena} RSD - Količina: {proizvod.kolicina}
                    </li>
                ))}
            </ul>
            <p>Ukupna Cena: {transakcijaData.ukupnaCena} RSD</p>

            <button onClick={handleZavrsiNarudzbinu}>Završi</button>
        </div>
    );
};

export default FinalizacijaNarudzbine;
