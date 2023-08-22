import React, { useContext } from 'react';
import { PortfolioContext } from '../../../context/PortfolioContext';
import '../../../assets/css/common/Table.css'

const PortfolioTable = () => {

    const portfolio = useContext(PortfolioContext);
    const assets = portfolio.display();

    const removeAsset = (asset, weight, index) => {
        portfolio.removeAsset(asset, weight, index);
    };

    return (
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
                            <td>
                                <button className='button' onClick={() => removeAsset(asset, weight, index)}>Remove</button>
                            </td>
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
    );
}

export default PortfolioTable;
