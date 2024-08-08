// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pocetna from './components/Pocetna';
import Proizvodi from './components/Proizvodi';
import DodajProizvod from './components/DodajProizvod';
import EditProizvoda from './components/EditProizvoda';
import DeleteProizvoda from './components/DeleteProizvoda';
import Korpa from './components/Korpa';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Pocetna />} />
                <Route path="/proizvodi" element={<Proizvodi />} />
                <Route path="/dodaj-proizvod" element={<DodajProizvod />} />
                <Route path="/edit-proizvoda/:id" element={<EditProizvoda />} />
                <Route path="/delete-proizvoda/:id" element={<DeleteProizvoda />} />
                <Route path="/korpa" element={<Korpa />} />
            </Routes>
        </Router>
    );
}

export default App;
