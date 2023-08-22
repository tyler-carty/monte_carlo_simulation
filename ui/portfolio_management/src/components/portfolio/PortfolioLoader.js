import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../assets/css/common/Table.css'

function PortfolioLoader() {
    const [portfolios, setPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const portfolioDropdown = useRef(null); // Ref for the dropdown

    useEffect(() => {
        // Fetch the list of portfolios from the Django backend when the component mounts.
        axios.get('http://localhost:8000/api/portfolios/')
            .then(response => {
                // Set the portfolios state variable with the fetched data.
                setPortfolios(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the portfolios!", error);
            });
    }, []);

    const handleLoadPortfolio = () => {
        // Load the portfolio using the provided ID. This could involve another API call.
        const selectedPortfolio = portfolioDropdown.current.value;
        console.log("Selected portfolio: ", selectedPortfolio);
    };

    return (
        <div>
            <select ref={portfolioDropdown}>
                <option value="" disabled selected>Select a portfolio</option>
                {portfolios.map(portfolio => (
                    <option key={portfolio.id} value={portfolio.id}>
                        {portfolio.name}
                    </option>
                ))}
                <default>
                    
                </default>
            </select>
            <button className='button' onClick={() => handleLoadPortfolio()}>Load Portfolio</button>
        </div>
    );
}

export default PortfolioLoader;
