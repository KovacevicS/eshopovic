import React, { useState } from 'react';
import axios from 'axios';
import './Kodzapopust.css'; // Stilovi za ovu stranu

const Kodzapopust = () => {
    const [imePopusta, setImePopusta] = useState('');
    const [procenat, setProcenat] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/popusti', {
                ime_popusta: imePopusta,
                procenat: parseFloat(procenat) // Konvertuj procenat u decimal
            });
            setMessage(response.data.message);
            setImePopusta('');
            setProcenat('');
        } catch (error) {
            console.error('Greška pri dodavanju popusta:', error);
            setMessage('Greška pri dodavanju popusta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-discount-code-container">
            <h1>Dodaj Popust</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Ime Popusta:
                    <input
                        type="text"
                        value={imePopusta}
                        onChange={(e) => setImePopusta(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Popust (%):
                    <input
                        type="number"
                        value={procenat}
                        onChange={(e) => setProcenat(e.target.value)}
                        required
                        min="0"
                        max="100"
                        step="0.01" // Omogućava decimalne vrednosti
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Dodavanje...' : 'Dodaj Popust'}
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Kodzapopust;
