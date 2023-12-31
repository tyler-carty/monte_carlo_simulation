import React, { useState, useEffect, useContext } from 'react';
import { PortfolioContext } from '../../context/PortfolioContext';
import PortfolioTable from './management/PortfolioTable.js'
import InvestmentHorizonTable from './horizon/InvestmentHorizonTable';
import PortfolioManagementSection from './management/PortfolioManagementSection';
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
            setPortfolios(prevPortfolios => [...prevPortfolios, ...response.data]);
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
                <PortfolioManagementSection portfolios={portfolios} onUpdatePortfolios={fetchPortfolios} />
            </div>
        </div>
    );
}

export default SavePortfolioPage;
