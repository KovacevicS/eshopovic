// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pocetna from './components/Pocetna';
import Tabela from './Proizvodi/Proizvodi';
import DodajProizvod from './Proizvodi/DodajProizvod';
import EditProizvoda from './Proizvodi/EditProizvoda';
import DeleteProizvoda from './Proizvodi/DeleteProizvoda';
import Korpa from './components/Korpa';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Pocetna />} />
                <Route path="/proizvodi" element={<Tabela />} />
                <Route path="/dodaj-proizvod" element={<DodajProizvod />} />
                <Route path="/edit-proizvoda/:id" element={<EditProizvoda />} />
                <Route path="/delete-proizvoda/:id" element={<DeleteProizvoda />} />
                <Route path="/korpa" element={<Korpa />} />
            </Routes>
        </Router>
    );
}

export default App;
//resen konfilkt