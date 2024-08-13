// src/App.js
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pocetna from './components/Pocetna';
import Tabela from './Proizvodi/Proizvodi';
import DodajProizvod from './Proizvodi/DodajProizvod';
import EditProizvoda from './Proizvodi/EditProizvoda';
import DeleteProizvoda from './Proizvodi/DeleteProizvoda';
import Korpa from './components/Korpa';
import Navbar from './components/Navbar';
import LoginPage from './login/LoginPage';
import SignUpPage from './login/SignUpPage';
import DodajKorisnika from './login/Dodajkorisnika';
import { AuthProvider } from './login/auth';
import ProizvodDetalji from './Proizvodi/ProizvodDetalji';
import Checkout from './components/Checkout';
import FinalizacijaNarudzbine from './components/FinalizacijaNarudzbine';

function App() {
    const [korpa, setKorpa] = useState([]);

    const dodajUKorpu = (proizvod) => {
        setKorpa(prevKorpa => [...prevKorpa, proizvod]);
    };
    const ukloniIzKorpe = (id) => {
        setKorpa(prevKorpa => prevKorpa.filter(proizvod => proizvod.id !== id));
    };


    return (
        <Router>
        <AuthProvider>
       
            <Navbar />
            <Routes>
                <Route path="/" element={<Pocetna />} />
                <Route path="/proizvodi" element={<Tabela />} />
                <Route path="/dodaj-proizvod" element={<DodajProizvod />} />
                <Route path="/edit-proizvoda/:id" element={<EditProizvoda />} />
                <Route path="/delete-proizvoda/:id" element={<DeleteProizvoda />} />
                <Route path="/korpa" element={<Korpa korpa={korpa} ukloniIzKorpe={ukloniIzKorpe} />} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/Signup" element={<SignUpPage/>}/>
                <Route path="/Dodajkorisnika" element={<DodajKorisnika/>}/>
                <Route path="/proizvodi/:id" element={<ProizvodDetalji dodajUKorpu={dodajUKorpu} />} />
                <Route path="/checkout" element={<Checkout korpa={korpa} />} />
                <Route path="/zavrsi" element={<FinalizacijaNarudzbine/>}/>
            </Routes>
        
        </AuthProvider>
        </Router>
    );
}

export default App;
//resen konfilkt