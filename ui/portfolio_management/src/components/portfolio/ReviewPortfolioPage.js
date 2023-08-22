import React, { useState, useEffect, useContext } from 'react';
import { PortfolioContext } from '../../context/PortfolioContext';
import PortfolioTable from './PortfolioTable.js'
import InvestmentHorizonTable from './InvestmentHorizonTable';
import PortfolioLoader from './PortfolioLoader.js'
import PortfolioSaver from './PortfolioSaver.js'
import axios from 'axios';

function SavePortfolioPage() {
    const portfolio = useContext(PortfolioContext);
    const assets = portfolio.display();

    // State to hold the list of portfolios
    const [portfolios, setPortfolios] = useState([]);

    // Function to fetch portfolios
    const fetchPortfolios = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/portfolios/');
            setPortfolios(response.data);
        } catch (error) {
            console.error("Error fetching portfolios:", error);
        }
        console.log("Fetching portfolios...");
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);

    return (
        <div className='center-body'>
            <div className='center-body'>
                {assets.length > 0 ? (
                    <>
                        <PortfolioTable />
                    </>
                ) : (
                    <h3>You have no assets in your portfolio!</h3>
                )}

                <InvestmentHorizonTable />
                <PortfolioSaver onUpdatePortfolios={fetchPortfolios} />
                <PortfolioLoader portfolios={portfolios} />
            </div>
        </div>
    );
}

export default SavePortfolioPage;
