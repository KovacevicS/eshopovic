import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminProizvodi.css'; // Stilovi za tabelu i input polja

const AdminProizvodi = () => {
    const [proizvodi, setProizvodi] = useState([]);
    const [transakcije, setTransakcije] = useState([]);
    const [korisnici, setKorisnici] = useState([]);
    const [popusti, setPopusti] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [proizvodiResponse, transakcijeResponse, korisniciResponse, popustiResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/proizvodi'),
                    axios.get('http://localhost:5000/api/transakcije'),
                    axios.get('http://localhost:5000/api/korisnici'),
                    axios.get('http://localhost:5000/api/popusti')
                ]);

                setProizvodi(proizvodiResponse.data);
                setTransakcije(transakcijeResponse.data);
                setKorisnici(korisniciResponse.data);
                setPopusti(popustiResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Greška pri preuzimanju podataka:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e, id, type) => {
        const { name, value } = e.target;
        if (type === 'proizvod') {
            setProizvodi(proizvodi.map(proizvod =>
                proizvod.id === id ? { ...proizvod, [name]: value } : proizvod
            ));
        } else if (type === 'transakcija') {
            setTransakcije(transakcije.map(transakcija =>
                transakcija.id === id ? { ...transakcija, [name]: value } : transakcija
            ));
        } else if (type === 'korisnik') {
            setKorisnici(korisnici.map(korisnik =>
                korisnik.id === id ? { ...korisnik, [name]: value } : korisnik
            ));
        } else if (type === 'popust') {
            setPopusti(popusti.map(popust =>
                popust.id === id ? { ...popust, [name]: value } : popust
            ));
        }
    };

    const handleSave = async (id, type) => {
        try {
            if (type === 'proizvod') {
                const proizvod = proizvodi.find(p => p.id === id);
                await axios.put(`http://localhost:5000/api/proizvodi/${id}`, proizvod);
            } else if (type === 'transakcija') {
                const transakcija = transakcije.find(t => t.id === id);
                await axios.put(`http://localhost:5000/api/transakcije/${id}`, transakcija);
            } else if (type === 'korisnik') {
                const korisnik = korisnici.find(k => k.id === id);
                await axios.put(`http://localhost:5000/api/korisnici/${id}`, korisnik);
            } else if (type === 'popust') {
                const popust = popusti.find(p => p.id === id);
                await axios.put(`http://localhost:5000/api/popusti/${id}`, popust);
            }
            alert('Podaci uspešno ažurirani!');
        } catch (error) {
            console.error('Greška pri ažuriranju podataka:', error);
        }
    };

    const handleDelete = async (id, type) => {
        try {
            if (type === 'proizvod') {
                await axios.delete(`http://localhost:5000/api/proizvodi/${id}`);
                setProizvodi(proizvodi.filter(p => p.id !== id));
            } else if (type === 'transakcija') {
                await axios.delete(`http://localhost:5000/api/transakcije/${id}`);
                setTransakcije(transakcije.filter(t => t.id !== id));
            } else if (type === 'korisnik') {
                await axios.delete(`http://localhost:5000/api/korisnici/${id}`);
                setKorisnici(korisnici.filter(k => k.id !== id));
            } else if (type === 'popust') {
                await axios.delete(`http://localhost:5000/api/popusti/${id}`);
                setPopusti(popusti.filter(p => p.id !== id));
            }
            alert('Podaci uspešno obrisani!');
        } catch (error) {
            console.error('Greška pri brisanju podataka:', error);
        }
    };
    

    if (loading) {
        return <p>Učitavanje...</p>;
    }

    return (
        <div className="admin-tabele-container">
            <h1>Administracija</h1>

            <section>
                <h2>Proizvodi</h2>
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
                                <td><input type="text" name="ime" value={proizvod.ime} onChange={(e) => handleInputChange(e, proizvod.id, 'proizvod')} /></td>
                                <td><input type="text" name="opis" value={proizvod.opis} onChange={(e) => handleInputChange(e, proizvod.id, 'proizvod')} /></td>
                                <td><input type="number" name="kolicina" value={proizvod.kolicina} onChange={(e) => handleInputChange(e, proizvod.id, 'proizvod')} /></td>
                                <td><input type="number" name="cena" value={proizvod.cena} onChange={(e) => handleInputChange(e, proizvod.id, 'proizvod')} /></td>
                                <td><input type="text" name="slika" value={proizvod.slika} onChange={(e) => handleInputChange(e, proizvod.id, 'proizvod')} /></td>
                                <td className='buttontds'>
    <button onClick={() => handleSave(proizvod.id, 'proizvod')}>
        <i className="ri-save-2-line"></i>
    </button>
    <button className="delete-button" onClick={() => handleDelete(proizvod.id, 'proizvod')}>
        <i className="ri-delete-bin-6-line"></i>
    </button>
</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Transakcije</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Korisnik ID</th>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Email</th>
                            <th>Datum</th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transakcije.map(transakcija => (
                            <tr key={transakcija.id}>
                                <td>{transakcija.id}</td>
                                <td><input type="text" name="korisnik_id" value={transakcija.korisnik_id} onChange={(e) => handleInputChange(e, transakcija.id, 'transakcija')} /></td>
                                <td><input type="text" name="ime" value={transakcija.ime} onChange={(e) => handleInputChange(e, transakcija.id, 'transakcija')} /></td>
                                <td><input type="text" name="prezime" value={transakcija.prezime} onChange={(e) => handleInputChange(e, transakcija.id, 'transakcija')} /></td>
                                <td><input type="text" name="email" value={transakcija.email} onChange={(e) => handleInputChange(e, transakcija.id, 'transakcija')} /></td>
                                <td><input type="text" name="datum_transakcije" value={transakcija.datum_transakcije} onChange={(e) => handleInputChange(e, transakcija.id, 'transakcija')} /></td>
                                <td className='buttontds'>
    <button onClick={() => handleSave(transakcija.id, 'transakcija')}>
        <i className="ri-save-2-line"></i>
    </button>
    <button className="delete-button" onClick={() => handleDelete(transakcija.id, 'transakcija')}>
        <i className="ri-delete-bin-6-line"></i>
    </button>
</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Korisnici</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Email</th>
                            <th>Adresa</th>
                            <th>Telefon</th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {korisnici.map(korisnik => (
                            <tr key={korisnik.id}>
                                <td>{korisnik.id}</td>
                                <td><input type="text" name="ime" value={korisnik.ime} onChange={(e) => handleInputChange(e, korisnik.id, 'korisnik')} /></td>
                                <td><input type="text" name="prezime" value={korisnik.prezime} onChange={(e) => handleInputChange(e, korisnik.id, 'korisnik')} /></td>
                                <td><input type="text" name="email" value={korisnik.email} onChange={(e) => handleInputChange(e, korisnik.id, 'korisnik')} /></td>
                                <td><input type="text" name="adresa" value={korisnik.adresa} onChange={(e) => handleInputChange(e, korisnik.id, 'korisnik')} /></td>
                                <td><input type="text" name="telefon" value={korisnik.telefon} onChange={(e) => handleInputChange(e, korisnik.id, 'korisnik')} /></td>
                                <td className='buttontds'>
    <button onClick={() => handleSave(korisnik.id, 'korisnik')}>
        <i className="ri-save-2-line"></i>
    </button>
    <button className="delete-button" onClick={() => handleDelete(korisnik.id, 'korisnik')}>
        <i className="ri-delete-bin-6-line"></i>
    </button>
</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Popusti</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ime Popusta</th>
                            <th>Procenat</th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {popusti.map(popust => (
                            <tr key={popust.id}>
                                <td>{popust.id}</td>
                                <td><input type="text" name="ime_popusta" value={popust.ime_popusta} onChange={(e) => handleInputChange(e, popust.id, 'popust')} /></td>
                                <td><input type="number" name="procenat" value={popust.procenat} onChange={(e) => handleInputChange(e, popust.id, 'popust')} /></td>
                                <td className='buttontds'>
    <button onClick={() => handleSave(popust.id, 'popust')}>
        <i className="ri-save-2-line"></i>
    </button>
    <button className="delete-button" onClick={() => handleDelete(popust.id, 'popust')}>
        <i className="ri-delete-bin-6-line"></i>
    </button>
    <a href='/kodzapopust'>Dodaj popust</a>
</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AdminProizvodi;