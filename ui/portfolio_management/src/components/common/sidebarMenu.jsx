import React from 'react';
import '../../assets/css/common/Container.css';
import '../../assets/css/common/Button.css';

function SidebarMenu({ setSelectedFunction }) {

    return (
        <div className='center-buttons'>
            <button
                type="button"
                className="button"
                onClick={() => {
                    setSelectedFunction('addAsset');
                }}>
                Add Asset
            </button>
            <button
                type="button"
                className="button"
                onClick={() => {
                    setSelectedFunction('savePortfolio');
                }}>
                Review and Save Portfolio
            </button>
            <button
                type="button"
                className="button"
                onClick={() => {
                    setSelectedFunction('runSimulation');
                }}>
                Run Monte Carlo Simulation
            </button>
        </div>
    );
}

export default SidebarMenu;