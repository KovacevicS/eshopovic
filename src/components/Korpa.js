// src/Korpa.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Korpa.css";

const Korpa = ({ korpa, ukloniIzKorpe, isprazniKorpu }) => {
  const [proizvodi, setProizvodi] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProizvodi = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/proizvodi");
        const dostupniProizvodi = response.data;
        const updatedProizvodi = korpa.map((proizvod) => {
          const dostupniProizvod = dostupniProizvodi.find(
            (p) => p.id === proizvod.id
          );
          return {
            ...proizvod,
            dostupnaKolicina: dostupniProizvod ? dostupniProizvod.kolicina : 0,
          };
        });
        setProizvodi(updatedProizvodi);
      } catch (error) {
        console.error(
          "Greška prilikom preuzimanja podataka o proizvodima:",
          error
        );
      }
    };

    fetchProizvodi();
  }, [korpa]);

  const handleRemove = (id) => {
    ukloniIzKorpe(id);
  };


  const handleIzabranaKolicina = (id, event) => {
    const novaKolicina = parseInt(event.target.value, 10);
    setProizvodi((prevProizvodi) =>
      prevProizvodi.map((proizvod) =>
        proizvod.id === id ? { ...proizvod, kolicina: novaKolicina } : proizvod
      )
    );
  };

  const handleDiscountCode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/popusti`);
      const discountList = response.data;
      const discount = discountList.find((d) => d.ime_popusta === discountCode);

      if (discount) {
        setDiscountPercentage(discount.procenat);
        alert(`Popust od ${discount.procenat}% je primenjen.`);
      } else {
        setDiscountPercentage(0);
        alert("Kod za popust nije pronađen.");
      }
    } catch (error) {
      console.error("Greška pri preuzimanju popusta:", error);
      setDiscountPercentage(0);
    } finally {
      setLoading(false);
    }
  };

  const ukupnaCena = proizvodi.reduce((total, proizvod) => {
    return total + proizvod.cena * proizvod.kolicina;
  }, 0);

  const ukupnaCenaSaPopustom = ukupnaCena * (1 - discountPercentage / 100);

  const formatProizvodi = proizvodi.map(({ id, ime, cena, kolicina }) => ({
    id,
    ime,
    cena,
    kolicina,
  }));

  return (
    <div className="korpa-container">
      <h1 className="korpa-header">Vaša Korpa</h1>
      {proizvodi.length === 0 ? (
        <p className="korpa-empty">Vaša korpa je prazna.</p>
      ) : (
        <>
          <ul className="korpa-list">
            {proizvodi.map((proizvod) => (
              <li key={proizvod.id} className="korpa-item">
                {proizvod.ime} - {proizvod.cena} RSD
                <input
                  type="number"
                  min="1"
                  max={proizvod.dostupnaKolicina}
                  value={proizvod.kolicina}
                  onChange={(event) =>
                    handleIzabranaKolicina(proizvod.id, event)
                  }
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
          <div className="korpa-total">
            <h2>Ukupna Cena: {ukupnaCena} RSD</h2>
          </div>
        </>
      )}
      <div className="korpa-discount">
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Unesite kod za popust"
          className="korpa-discount-input"
        />
        <button
          className="korpa-apply-discount-button"
          onClick={handleDiscountCode}
          disabled={loading}
        >
          {loading ? "Provera..." : "Primeni Popust"}
        </button>
      </div>
      <div className="korpa-total">
        <h2>Ukupna Cena sa Popustom: {ukupnaCenaSaPopustom.toFixed(2)} RSD</h2>
      </div>
      <button
        className="korpa-checkout-button"
        onClick={() =>
          navigate("/checkout", {
            state: {
              proizvodi: formatProizvodi,
              ukupnaCena: ukupnaCena,
              ukupnaCenaSaPopustom,
            },
          })
        }
        disabled={proizvodi.length === 0}
      >
        Nastavi na plaćanje
      </button>
    </div>
  );
};

export default Korpa;
