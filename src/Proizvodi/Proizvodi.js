import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Proizvodi.css";
import { useNavigate } from "react-router-dom";

const Tabela = ({ dodajUKorpu, ukloniIzKorpe }) => {
  const [proizvodi, setProizvodi] = useState([]);
  const [korpaProizvodi, setKorpaProizvodi] = useState([]);
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
    setKorpaProizvodi(prev => [...prev, proizvod.id]);
  };

  const handleIzbaciIzKorpe = (proizvod) => {
    ukloniIzKorpe(proizvod.id);
    setKorpaProizvodi(prev => prev.filter(id => id !== proizvod.id));
  };

  const isProizvodUKorpi = (id) => korpaProizvodi.includes(id);

  return (
    <div className="proizvodi-container">
      <div className="proizvodi-lista">
        {proizvodi.length > 0 ? (
          proizvodi.map((proizvod, index) => (
            <div key={index} className="proizvod-kartica">
              <h3 className="proizvod-ime">{proizvod.ime}</h3>
              <img src={proizvod.slika} alt={proizvod.ime} className="proizvod-slika" />
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
    </div>
  );
};

export default Tabela;