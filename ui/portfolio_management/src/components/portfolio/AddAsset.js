import React, { useState, useContext } from 'react';
import DisplayPortfolio from './DisplayPortfolio';
import { PortfolioContext } from '../../context/PortfolioContext';
import '../../assets/css/common/Table.css'

function AddAsset() {
    const [assetName, setAssetName] = useState('');
    const [weight, setWeight] = useState(0);
    const portfolio = useContext(PortfolioContext);

    const handleAddAsset = () => {
        portfolio.addAsset(assetName, weight);
    };

    return (
        <div className='center-body'>
            <h3>Add Assets to Portfolio</h3>
            <div className='center-body'>
                <table>
                    <tbody>
                        <tr>
                            <th>Asset Name:</th>
                            <th>Weight:</th>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" value={assetName} onChange={e => setAssetName(e.target.value)} />
                            </td>
                            <td>
                                <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button className='button' onClick={handleAddAsset}>Add Asset</button>

            {portfolio.error && <p style={{ color: 'red' }}>{portfolio.error}</p>}
            </div>
        </div>
    );
}

export default AddAsset;