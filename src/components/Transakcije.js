import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../login/auth'; // Uvoz useAuth za dobijanje informacija o korisniku
import './Transakcije.css'; // Uvoz CSS fajla

const Transakcije = () => {
  const { user } = useAuth(); // Dohvatanje korisničkih informacija
  const [transakcije, setTransakcije] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransakcije = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transakcije'); // Putanja do API za transakcije
        const allTransakcije = response.data;

        // Filtriranje transakcija samo za korisnike sa ulogom 'kupac'
        if (user && user.uloga === 'kupac') {
          const filteredTransakcije = allTransakcije.filter(transakcija => transakcija.email === user.email);
          setTransakcije(filteredTransakcije);
        } else {
          setTransakcije(allTransakcije);
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTransakcije();
  }, [user]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="transakcije-container">
      <h1>Transakcije</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Datum</th>
            <th>Proizvodi</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          {transakcije.map(transakcija => (
            <tr key={transakcija.id}>
              <td>{transakcija.id}</td>
              <td>{transakcija.email}</td>
              <td>{new Date(transakcija.datum_transakcije).toLocaleString()}</td>
              <td>{transakcija.proizvodi}</td>
              <td>{transakcija.cena}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transakcije;
