import React, { useContext } from 'react';
import { PortfolioContext } from '../../context/PortfolioContext';
import '../../assets/css/common/Table.css'

function DisplayPortfolio() {

    const portfolio = useContext(PortfolioContext);
    const assets = portfolio.display();

    const removeAsset = (asset, weight, index) => {
        portfolio.removeAsset(asset, weight, index);
    };

    return (
        <div className='center-body'>
            <div className='center-body'>
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
                                <td>{weight*100}%</td>
                                <td><button className='button' onClick={() => removeAsset(asset, weight, index)}>Remove</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <h3>You have no assets in your portfolio!</h3>
            )}
            </div>
        </div>
    );
}

export default DisplayPortfolio;