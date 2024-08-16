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
                ...state,
                ime: state.ime,
                prezime: state.prezime,
                email: state.email,
                adresa: state.adresa,
                telefon: state.telefon,
                ukupnaCena: state.ukupnaCena,
                ukupnaCenaSaPopustom: state.ukupnaCenaSaPopustom
            });
            setLoading(false);
        } else {
            navigate('/korpa'); // Ako nema podataka, vrati na stranicu sa korpom
        }
    }, [state, navigate]);

    // Izračunavanje ukupne cene sa popustom
    const ukupnaCena = transakcijaData.ukupnaCena || 0;
    const ukupnaCenaSaPopustom = transakcijaData.ukupnaCenaSaPopustom || ukupnaCena;

    const handleZavrsiNarudzbinu = async () => {
        try {
            console.log('Podaci koji se šalju:', {
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
                datum_transakcije: new Date().toISOString(),
            });
    
            await axios.post('http://localhost:5000/api/transakcije', {
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
                datum_transakcije: new Date().toISOString(),
            });
            navigate('/zahvalnica');
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
            <p>Ime: {transakcijaData.ime}</p>
            <p>Prezime: {transakcijaData.prezime}</p>
            <p>Email: {transakcijaData.email}</p>
            <p>Adresa: {transakcijaData.adresa}</p>
            <p>Telefon: {transakcijaData.telefon}</p>

            <h2>Vaša Narudžbina</h2>
            <ul>
                {transakcijaData.korpa && transakcijaData.korpa.map((proizvod) => (
                    <li key={proizvod.id}>
                        {proizvod.ime} -Redovna cena {proizvod.cena} RSD - Količina: {proizvod.kolicina}
                    </li>
                ))}
            </ul>
            <p>Ukupna Cena: {ukupnaCenaSaPopustom} RSD</p>

            <button onClick={handleZavrsiNarudzbinu}>Završi</button>
        </div>
    );
};

export default FinalizacijaNarudzbine;
