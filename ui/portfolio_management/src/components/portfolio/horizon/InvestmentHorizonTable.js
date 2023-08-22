import React, { useContext, useState } from 'react';
import { PortfolioContext } from '../../../context/PortfolioContext';

const InvestmentHorizonTable = () => {

    const portfolio = useContext(PortfolioContext);
    const [investmentHorizon, setHorizon] = useState(252);

    const handleInvestmentHorizon = () => {
        portfolio.updateInvestmentHorizon(investmentHorizon);
    };

    return (
        <div>
            <table className='horizon-table'>
                <tbody>
                    <tr>
                        <th>Investment Horizon (trading days):</th>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="number" 
                                value={investmentHorizon}
                                onChange={e => setHorizon(Number(e.target.value))}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button className='button' onClick={handleInvestmentHorizon}>Update Investment Horizon</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {portfolio.updateError && <p style={{ color: 'red' }}>{portfolio.updateError}</p>}
            {portfolio.updateMessage && <p style={{ color: 'green' }}>{portfolio.updateMessage}</p>}
        </div>
    );
}

export default InvestmentHorizonTable;