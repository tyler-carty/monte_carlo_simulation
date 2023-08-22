import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PortfolioContext } from '../../context/PortfolioContext';

function PortfolioLoader() {
    const [availablePortfolios, setAvailablePortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const portfolioContext = useContext(PortfolioContext);
    const [message, setMessage] = useState('');  // TODO: Display a message when a portfolio is loaded successfully

    useEffect(() => {
        // Fetch all portfolios when the component mounts
        axios.get('http://localhost:8000/api/portfolios/')
            .then(response => {
                setAvailablePortfolios(response.data);
            })
            .catch(error => {
                console.error("Error fetching portfolios:", error);
            });
    }, []);

    const handleLoadPortfolio = () => {
        if (selectedPortfolio) {
            // Fetch the details of the selected portfolio and update the app's state
            // This might require adjustments based on the backend's implementation
            // axios.post('http://localhost:8000/load_portfolio/', { selected_portfolio: selectedPortfolio })
            //     .then(response => {
            //         // Update the app's state using the PortfolioContext
            //         // This might require adjustments based on the structure of the response
            //         portfolioContext.addAsset(response.data.asset, response.data.weight);
            //     })
            //     .catch(error => {
            //         console.error("Error loading portfolio:", error);
            //     });

            console.log("Selected portfolio: ", selectedPortfolio);
            setMessage('Portfolio loaded successfully!');
        }
    };

    return (
        <div>
            <select onChange={e => setSelectedPortfolio(e.target.value)}>
                {availablePortfolios.map(portfolio => (
                    <option key={portfolio.id} value={portfolio.id}>
                        {portfolio.name}
                    </option>
                ))}
            </select>
            <button className='button' onClick={handleLoadPortfolio}>Load Portfolio</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
}

export default PortfolioLoader;
