import React, { useState, useEffect, useContext } from 'react';
import { PortfolioContext } from '../../context/PortfolioContext';
import axios from 'axios';
import PortfolioTable from './PortfolioTable.js'
import InvestmentHorizonTable from './InvestmentHorizonTable';
import PortfolioLoader from './PortfolioLoader.js'
import PortfolioSaver from './PortfolioSaver.js'

function SavePortfolioPage() {

    const portfolio = useContext(PortfolioContext);
    const assets = portfolio.display();

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

                {portfolio.removeError && <p style={{ color: 'red' }}>{portfolio.removeError}</p>}
                {portfolio.removeMessage && <p style={{ color: 'green' }}>{portfolio.removeMessage}</p>}

                <InvestmentHorizonTable />

                <PortfolioSaver />

                <PortfolioLoader />
                
            </div>
        </div>
    );
}

export default SavePortfolioPage;
