import React, { useContext, useState } from 'react';
import { PortfolioContext } from '../../context/PortfolioContext';
import '../../assets/css/common/Table.css'

function DisplayPortfolio() {

    const portfolio = useContext(PortfolioContext);
    const assets = portfolio.display();

    const [investmentHorizon, setHorizon] = useState(252);

    const handleInvestmentHorizon = () => {
        portfolio.updateInvestmentHorizon(investmentHorizon);
    };

    const removeAsset = (asset, weight, index) => {
        portfolio.removeAsset(asset, weight, index);
    };

    return (
        <div className='center-body'>
            <div className='center-body'>

            <table className='horizon-table'>
                <tbody>
                    <tr>
                        <th>
                            Investment Horizon (trading days):
                        </th>
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

            {assets.length > 0 ? (
                <>
                    <h2>Your Portfolio</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Asset</th>
                                <th>Weight</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {assets.map(({ asset, weight, index }) => (
                            <tr key={asset}>
                                <td>{asset}</td>
                                <td>{weight}%</td>
                                <td><button className='button' onClick={() => removeAsset(asset, weight, index)}>Remove</button></td>
                            </tr>
                        ))}
                        {/* calculate the total weight */}
                        <tr>
                            <td><b>Total Portfolio Allocation</b></td>
                            <td><b>{assets.reduce((total, { weight }) => total + weight, 0)}%</b></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </>
            ) : (
                <h3>You have no assets in your portfolio!</h3>
            )}

            {portfolio.removeError && <p style={{ color: 'red' }}>{portfolio.removeError}</p>}
            {portfolio.removeMessage && <p style={{ color: 'green' }}>{portfolio.removeMessage}</p>}

            {portfolio.updateError && <p style={{ color: 'red' }}>{portfolio.updateError}</p>}
            {portfolio.updateMessage && <p style={{ color: 'green' }}>{portfolio.updateMessage}</p>}

            </div>
        </div>
    );
}

export default DisplayPortfolio;