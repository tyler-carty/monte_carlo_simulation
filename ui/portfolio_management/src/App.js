import React, { useState } from 'react';
import SidebarMenu from './components/common/sidebarMenu';
import AddAsset from './components/portfolio/AddAsset';
import RunSimulation from './components/portfolio/RunSimulation';
import { PortfolioProvider } from './context/PortfolioContext';
import SavePortfolioPage from './components/portfolio/ReviewPortfolioPage';

function App() {
    const [selectedFunction, setSelectedFunction] = useState(null);

    let renderFunctionComponent;

    switch (selectedFunction) {
        case 'addAsset':
            renderFunctionComponent = <AddAsset />;
            break;
        case 'savePortfolio':
            renderFunctionComponent = <SavePortfolioPage />;
            break;
        case 'runSimulation':
            renderFunctionComponent = <RunSimulation />;
            break;
        default:
            renderFunctionComponent = <AddAsset />;
            break;
    }

    return (
        <div>
            
            <PortfolioProvider>
                <div className="center-body">
                    <h1>Portfolio Management & Predictions</h1>
                </div>
                <SidebarMenu 
                    setSelectedFunction={setSelectedFunction}
                />
                {renderFunctionComponent}
            </PortfolioProvider>
            
        </div>
    );
}

export default App;
