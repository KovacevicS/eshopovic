import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Da biste koristili axios za fetch
import './Korpa.css'; // Import CSS

const Korpa = ({ korpa, ukloniIzKorpe }) => {
    const [proizvodi, setProizvodi] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProizvodi = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/proizvodi");
                const dostupniProizvodi = response.data;
                const updatedProizvodi = korpa.map(proizvod => {
                    const dostupniProizvod = dostupniProizvodi.find(p => p.id === proizvod.id);
                    return {
                        ...proizvod,
                        dostupnaKolicina: dostupniProizvod ? dostupniProizvod.kolicina : 0,
                        kolicina: proizvod.kolicina || 1 // Postavite početnu količinu na 1
                    };
                });
                setProizvodi(updatedProizvodi);
            } catch (error) {
                console.error("Greška prilikom preuzimanja podataka o proizvodima:", error);
            }
        };

        fetchProizvodi();
    }, [korpa]);

    const handleRemove = (id) => {
        ukloniIzKorpe(id);
    };

    const handleCheckout = () => {
        const korpaZaPlacanje = proizvodi.map(proizvod => ({
            ime: proizvod.ime,
            cena: proizvod.cena,
            kolicina: proizvod.kolicina
        }));
console.log(korpaZaPlacanje)
        navigate('/checkout', { state: { korpaZaPlacanje } });
    };
    const handleIzabranaKolicina = (id, event) => {
        const novaKolicina = parseInt(event.target.value, 10);
        setProizvodi(prevProizvodi =>
            prevProizvodi.map(proizvod =>
                proizvod.id === id
                    ? { ...proizvod, kolicina: novaKolicina }
                    : proizvod
            )
        );
    };

    return (
        <div className="korpa-container">
            <h1 className="korpa-header">Vaša Korpa</h1>
            {proizvodi.length === 0 ? (
                <p className="korpa-empty">Vaša korpa je prazna.</p>
            ) : (
                <ul className="korpa-list">
                    {proizvodi.map(proizvod => (
                        <li key={proizvod.id} className="korpa-item">
                            {proizvod.ime} - {proizvod.cena} RSD
                            <input
                                type="number"
                                min="1"
                                max={proizvod.dostupnaKolicina}
                                value={proizvod.kolicina || 1}
                                onChange={(event) => handleIzabranaKolicina(proizvod.id, event)}
                                className="korpa-quantity-input"
                            />
                            <button 
                                className="korpa-remove-button"
                                onClick={() => handleRemove(proizvod.id)}
                            >
                                Ukloni
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button 
                className="korpa-checkout-button"
                onClick={handleCheckout}
            >
                Nastavi na plaćanje
            </button>
        </div>
    );
};

export default Korpa;
