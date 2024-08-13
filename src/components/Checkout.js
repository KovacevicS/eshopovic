import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ korpa }) => {
    const [user, setUser] = useState(null); // Pretpostavljamo da ovo odražava trenutno ulogovanog korisnika
    const [formData, setFormData] = useState({
        ime: '',
        prezime: '',
        adresa: '',
        email: '',
        telefon: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Simulacija provere da li je korisnik ulogovan
        // Ovaj deo treba da bude vezan za autentifikaciju
        const loggedInUser = JSON.parse(localStorage.getItem('user')); // Primer
        setUser(loggedInUser);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };



    const handleNapraviNalog = () => {
        navigate('/signup');
    };

    const handleNastaviSaPodacima = () => {
        navigate('/zavrsi', { state: { ...formData, korpa } });
    };

    return (
        <div className="checkout-container">
            {user ? (
                <div>
                    <h1>Podaci o korisniku</h1>
                    <button onClick={() => navigate('/edit-profile')}>Izmeni podatke</button>
                    <button onClick={() => handleNastaviSaPodacima()}>Poruci</button>
                </div>
            ) : (
                <form onSubmit={handleNastaviSaPodacima} className="checkout-form">
                    <h1>Unesite svoje podatke ili napravite nalog</h1>
                    <input
                        type="text"
                        name="ime"
                        placeholder="Ime"
                        value={formData.ime}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="prezime"
                        placeholder="Prezime"
                        value={formData.prezime}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="adresa"
                        placeholder="Adresa"
                        value={formData.adresa}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="tel"
                        name="telefon"
                        placeholder="Broj telefona"
                        value={formData.telefon}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Nastavi</button>
                    <button type="button" onClick={handleNapraviNalog}>Napravi nalog</button>
                </form>
            )}
        </div>
    );
};

export default Checkout;
