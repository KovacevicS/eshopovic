import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Proizvodi.css"; // Povezivanje CSS fajla
import { useAuth } from "../login/auth"; // Uvoz useAuth za dobijanje informacija o korisniku
import {  useNavigate } from "react-router-dom";
const Tabela = () => {
  const [proizvodi, setProizvodi] = useState([]);
  const { user } = useAuth(); // Dohvatanje korisničkih informacija i logout funkcije
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

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedProizvodName, setEditedProizvodName] = useState("");
  const [editedProizvodDescription, setEditedProizvodDescription] =
    useState("");
  const [editedProizvodCena, setEditedProizvodCena] = useState("");

  const handleEdit = (index, proizvod) => {
    setEditingIndex(index);
    setEditedProizvodName(proizvod.ime);
    setEditedProizvodDescription(proizvod.opis);
    setEditedProizvodCena(proizvod.cena);
  };

  const handleSacuvaj = async (index) => {
    const updatedProizvod = {
      ime: editedProizvodName,
      opis: editedProizvodDescription,
      cena: editedProizvodCena,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/proizvodi/${proizvodi[index].id}`,
        updatedProizvod
      ); // URL za ažuriranje proizvoda
      const updatedProizvodi = [...proizvodi];
      updatedProizvodi[index] = updatedProizvod;
      setProizvodi(updatedProizvodi);
      setEditingIndex(null);
    } catch (error) {
      console.error("Greška pri ažuriranju proizvoda:", error);
    }
  };
  const handleViseOProizvodu = (proizvod) => {
    navigate(`/proizvodi/${proizvod.id}`, { state: proizvod });
  };

  return (
    <div className="proizvodi-container">
      {proizvodi.length > 0 ? (
        proizvodi.map((proizvod, index) => (
          <div key={index} className="proizvod-kartica">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedProizvodName}
                  onChange={(e) => setEditedProizvodName(e.target.value)}
                  className="proizvod-input"
                />
                <input
                  type="text"
                  value={editedProizvodDescription}
                  onChange={(e) => setEditedProizvodDescription(e.target.value)}
                  className="proizvod-input"
                />
                <input
                  type="text"
                  value={editedProizvodCena}
                  onChange={(e) => setEditedProizvodCena(e.target.value)}
                  className="proizvod-input"
                />
                <button
                  onClick={() => handleSacuvaj(index)}
                  className="sacuvaj-button"
                >
                  Sačuvaj
                </button>
              </>
            ) : (
              <>
                <h3 className="proizvod-ime">{proizvod.ime}</h3>
                <img src={proizvod.slika} alt={proizvod.ime} />
                <p className="proizvod-opis">{proizvod.opis}</p>
                <p className="proizvod-cena">{proizvod.cena} RSD</p>
                {user &&
                  user.uloga === "admin" && ( // Provera da li je korisnik admin
                    <button
                      onClick={() => handleEdit(index, proizvod)}
                      className="uredi-button"
                    >
                      Uredi
                    </button>
                  )}
                <button
                  onClick={() => handleViseOProizvodu(proizvod)}
                  className="vise-button"
                >
                  Više o proizvodu
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>Nema dostupnih proizvoda.</p>
      )}
    </div>
  );
};

export default Tabela;
