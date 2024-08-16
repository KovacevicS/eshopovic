import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../login/auth';
import './Checkout.css';

const Checkout = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        ime: '',
        prezime: '',
        adresa: '',
        email: '',
        telefon: '',
    });

    const navigate = useNavigate();
    const location = useLocation();
console.log(location.state)
    useEffect(() => {
        if (user) {
            setFormData({
                ime: user.ime || '',
                prezime: user.prezime || '',
                adresa: user.adresa || '',
                email: user.email || '',
                telefon: user.telefon || '',
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Checkout.js
    const handleNastaviSaPodacima = async (e) => {
        e.preventDefault();
    
        const korpaZaPlacanje = location.state?.proizvodi || [];
        const ukupnaCena = location.state?.ukupnaCena || 0;
        const ukupnaCenaSaPopustom = location.state?.ukupnaCenaSaPopustom || ukupnaCena;
    
        try {
            navigate('/zavrsi', {
                state: {
                    ...formData,
                    korpa: korpaZaPlacanje,
                    ukupnaCena,
                    ukupnaCenaSaPopustom,
                }
            });
        } catch (error) {
            console.error('Error handling checkout:', error);
        }
    };
    

    return (
        <div className="checkout-container">
            {user ? (
                <form onSubmit={handleNastaviSaPodacima} className="checkout-form">
                    <h1>Izmeni podatke o korisniku</h1>
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
                    <button type="button" onClick={() => navigate('/signup')}>Napravi nalog</button>
                </form>
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
                    <button type="button" onClick={() => navigate('/signup')}>Napravi nalog</button>
                </form>
            )}
        </div>
    );
};

export default Checkout;
