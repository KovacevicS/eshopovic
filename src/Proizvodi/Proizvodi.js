import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Proizvodi.css"; // Povezivanje CSS fajla
import { useNavigate } from "react-router-dom";
const Tabela = () => {
  const [proizvodi, setProizvodi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProizvodi = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/proizvodi");
        console.log(response.data); // Proveri da li stižu podaci
        setProizvodi(response.data);
      } catch (error) {
        console.error("Greška prilikom preuzimanja proizvoda:", error);
      }
    };

    fetchProizvodi();
  }, []);

  const handleViseOProizvodu = (proizvod) => {
    navigate(`/proizvodi/${proizvod.id}`, { state: proizvod });
  };

  return (
    <div className="proizvodi-container">
      {proizvodi.length > 0 ? (
        proizvodi.map((proizvod, index) => (
          <div key={index} className="proizvod-kartica">
            {
              <>
                <h3 className="proizvod-ime">{proizvod.ime}</h3>
                <img src={proizvod.slika} alt={proizvod.ime} />
                <p className="proizvod-opis">{proizvod.opis}</p>
                <p className="proizvod-cena">{proizvod.cena} RSD</p>
                <button
                  onClick={() => handleViseOProizvodu(proizvod)}
                  className="vise-button"
                >
                  Više o proizvodu
                </button>
              </>
            }
          </div>
        ))
      ) : (
        <p>Nema dostupnih proizvoda.</p>
      )}
    </div>
  );
};

export default Tabela;
