import React from 'react';
import PortfolioSaver from './PortfolioSaver';
import PortfolioLoader from './PortfolioLoader';
import '../../../assets/css/common/Table.css';

function PortfolioManagementSection({ portfolios, onUpdatePortfolios }) {
    return (
        <div className="center-body">
            <h2>Save / Load Portfolios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Save Portfolio</th>
                        <th>Load Portfolio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <PortfolioSaver onUpdatePortfolios={onUpdatePortfolios} />
                        </td>
                        <td>
                            <PortfolioLoader key={portfolios.length} portfolios={portfolios} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PortfolioManagementSection;