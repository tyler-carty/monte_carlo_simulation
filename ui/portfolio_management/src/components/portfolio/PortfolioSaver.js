import React, { useState, useEffect, useContext } from 'react';
import { PortfolioContext } from '../../context/PortfolioContext';
import axios from 'axios';
import '../../assets/css/common/Table.css';

function PortfolioSaver() {
    const [existingPortfolioNames, setExistingPortfolioNames] = useState([]);
    const [error, setError] = useState('');

    const portfolio = useContext(PortfolioContext);

    useEffect(() => {
        // Fetch the names of all existing portfolios to check for duplicates
        axios.get('http://localhost:8000/api/portfolios/')
            .then(response => {
                const names = response.data.map(portfolio => portfolio.name);
                setExistingPortfolioNames(names);
            })
            .catch(error => {
                console.error("There was an error fetching the portfolios!", error);
            });
    }, []);

    const handleSavePortfolio = () => {
        if (existingPortfolioNames.includes(portfolio.portfolioName)) {
            setError('A portfolio with this name already exists.');
            return;
        }
        else {
            portfolio.savePortfolio();  // Use context's save function
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Portfolio Name"
                value={portfolio.portfolioName}
                onChange={(e) => portfolio.savePortfolioName(e.target.value)} // directly use the method from context here
            />
            <button className='button' onClick={handleSavePortfolio}>Save Portfolio</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default PortfolioSaver;