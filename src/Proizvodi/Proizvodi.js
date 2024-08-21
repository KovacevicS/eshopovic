import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Proizvodi.css";
import { useNavigate } from "react-router-dom";

const Tabela = ({ dodajUKorpu, ukloniIzKorpe }) => {
  const [proizvodi, setProizvodi] = useState([]);
  const [korpaProizvodi, setKorpaProizvodi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProizvodi = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/proizvodi");
        const filtriraniProizvodi = response.data.filter(proizvod => proizvod.kolicina > 0);
        setProizvodi(filtriraniProizvodi);
      } catch (error) {
        console.error("Greška prilikom preuzimanja proizvoda:", error);
      }
    };

    fetchProizvodi();
  }, []);

  const handleViseOProizvodu = (proizvod) => {
    navigate(`/proizvodi/${proizvod.id}`, { state: proizvod });
  };

  const handleDodajUKorpu = (proizvod) => {
    dodajUKorpu({ ...proizvod, kolicina: 1 });
    setKorpaProizvodi(prev => [...prev, proizvod]);
  };

  const handleIzbaciIzKorpe = (proizvod) => {
    ukloniIzKorpe(proizvod.id);
    setKorpaProizvodi(prev => prev.filter(item => item.id !== proizvod.id));
  };

  const isProizvodUKorpi = (id) => korpaProizvodi.some(proizvod => proizvod.id === id);

  const sortiraniProizvodi = [...proizvodi].sort((a, b) => {
    return sortOrder === "asc" ? a.cena - b.cena : b.cena - a.cena;
  });

  const filtriraniProizvodi = sortiraniProizvodi.filter(proizvod =>
    proizvod.ime.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="proizvodi-container">
      <input
        type="text"
        placeholder="Pretraži proizvode..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="proizvodi-pretraga"
      />

      <div className="sortiranje-container">
        <button onClick={() => setSortOrder("asc")} className="sortiraj-btn">
          Cena ↓↑
        </button>
        <button onClick={() => setSortOrder("desc")} className="sortiraj-btn">
          Cena ↑↓
        </button>
      </div>

      <div className="proizvodi-lista">
        {filtriraniProizvodi.length > 0 ? (
          filtriraniProizvodi.map((proizvod, index) => (
            <div key={index} className="proizvod-kartica">
              <h3 className="proizvod-ime">{proizvod.ime}</h3>
              <img
                src={proizvod.slika ? `http://localhost:5000/uploads/${proizvod.slika}` : 'default-image.png'}
                alt={proizvod.ime}
                className="proizvod-slika"
              />
              <p className="proizvod-opis">{proizvod.opis}</p>
              <p className="proizvod-cena">{proizvod.cena} RSD</p>
              <button
                onClick={() => handleViseOProizvodu(proizvod)}
                className="proizvod-vise-btn"
              >
                Više o proizvodu
              </button>
              {isProizvodUKorpi(proizvod.id) ? (
                <button
                  onClick={() => handleIzbaciIzKorpe(proizvod)}
                  className="proizvod-izbaci-btn"
                >
                  Izbaci iz korpe
                </button>
              ) : (
                <button
                  onClick={() => handleDodajUKorpu(proizvod)}
                  className="proizvod-dodaj-btn"
                >
                  Dodaj u korpu
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Nema dostupnih proizvoda.</p>
        )}
      </div>

      {/* Korpa prikaz */}
      <div className="korpa-container-proizvod">
        <h5>Vaša korpa</h5>
        <ul>
          {korpaProizvodi.map((proizvod, index) => (
            <li key={index}>
              {proizvod.ime} - {proizvod.cena} RSD
            </li>
          ))}
        </ul>
        <button onClick={() => navigate("/korpa")} className="idi-u-korpu-btn">
          Idi u korpu
        </button>
      </div>
    </div>
  );
};

export default Tabela;