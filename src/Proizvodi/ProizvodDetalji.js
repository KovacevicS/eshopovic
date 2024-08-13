import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProizvodDetalji.css';

const ProizvodDetalji = ({ dodajUKorpu }) => {
    const { state: proizvod } = useLocation();
    const navigate = useNavigate();

    const handleDodajUKorpu = () => {
        if (dodajUKorpu) {
            dodajUKorpu(proizvod);
            navigate('/korpa'); // Navigacija na stranicu sa korpom nakon dodavanja
        }
    };

    if (!proizvod) {
        return <p>Proizvod nije pronađen.</p>;
    }

    return (
        <div className="proizvod-detalji-container">
            <h1 className="proizvod-ime">{proizvod.ime}</h1>
            <img src={proizvod.slika} alt={proizvod.ime} className="proizvod-slika" />
            <p className="proizvod-opis">{proizvod.opis}</p>
            <p className="proizvod-cena">{proizvod.cena} RSD</p>
            <button className="dodaj-u-korpu-button" onClick={handleDodajUKorpu}>
                Dodaj u korpu
            </button>
            <button className="nazad-button" onClick={() => navigate(-1)}>Nazad</button>
        </div>
    );
};

export default ProizvodDetalji;
