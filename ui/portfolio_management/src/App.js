import React, { useState } from 'react';
import SidebarMenu from './components/common/sidebarMenu';
import DisplayPortfolio from './components/portfolio/DisplayPortfolio';
import AddAsset from './components/portfolio/AddAsset';
import RunSimulation from './components/portfolio/RunSimulation';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
    const [selectedFunction, setSelectedFunction] = useState(null);

    let renderFunctionComponent;

    switch (selectedFunction) {
        case 'display':
            renderFunctionComponent = <DisplayPortfolio />;
            break;
        case 'addAsset':
            renderFunctionComponent = <AddAsset />;
            break;
        case 'runSimulation':
            renderFunctionComponent = <RunSimulation />;
            break;
        default:
            renderFunctionComponent = <DisplayPortfolio />;
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
