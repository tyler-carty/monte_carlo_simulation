import React, { useState, createContext } from 'react';
import axios from 'axios';

// Create the context
export const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
    const [assets, setAssets] = useState([]);
    const [weights, setWeights] = useState([]);
    const [weight] = useState([]);
    const [index] = useState(0);

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [removeMessage, setRemoveMessage] = useState(null);
    const [updateMessage, setUpdateMessage] = useState(null);

    const [investmentHorizon, setInvestmentHorizon] = useState(252);
    const [portfolioName, setPortfolioName] = useState('Default Portfolio Name');
    const [portfolios, setPortfolios] = useState([]);

    const validateAssetName = async (assetName) => {
        try {
            const response = await axios.get(`http://localhost:8000/validate_asset/${assetName}/`);
            if (response.data.isValid) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    const savePortfolio = async () => {
        try {
            const payload = {
                name: portfolioName,
                investment_horizon: investmentHorizon,
                assets: assets.map((asset, index) => ({
                    asset_name: asset,  // Change "ticker" to "asset_name"
                    weight: weights[index]
                }))
            };
    
            console.log("Payload: ", payload);
    
            const response = await axios.post('http://localhost:8000/portfolios/', payload);
            
            if (response.status === 201) {  // Successful POST requests usually return a 201 status
                console.log("Portfolio saved successfully!");
                setPortfolios(prevPortfolios => [...prevPortfolios, response.data]);
            } else {
                console.error("There was an issue saving the portfolio.");
            }
        } catch (error) {
            console.error("An error occurred while saving the portfolio:", error);
        }
    }

    const addAsset = (assetName, weight) => {
        
        setMessage(null); // Clear any previous messages

        if (weight <= 0) {
            setError("Weight should be a positive value.");
            return;
        }

        if (sum(weights) + weight > 100) {
            setError("Total weight exceeds 100%.");
            return;
        }

        // Check if assetName is already in the assets array
        if (assets.includes(assetName)) {
            setError("Asset already added to the portfolio.");
            return;
        }

        validateAssetName(assetName).then(isValid => {
            if (!isValid) {
                setError("Asset ticker is invalid.");
                return;
            }
            setAssets(prev => [...prev, assetName]);
            setWeights(prev => [...prev, weight]);
            setError(null); // Clear any previous errors
            setMessage("Asset added successfully.");
        });
    };

    const removeAsset = (asset, weight, index) => {
        setAssets(prev => prev.filter((_, i) => i !== index));
        setWeights(prev => prev.filter((_, i) => i !== index));
        setUpdateMessage(null); // Clear any previous messages
        setRemoveMessage("Asset removed successfully.");
    };

    const updateInvestmentHorizon = (horizon) => {
        setInvestmentHorizon(horizon);
        setRemoveMessage(null); // Clear any previous messages
        setUpdateMessage("Investment horizon updated successfully.")
    };

    const savePortfolioName = (name) => {
        setPortfolioName(name);
    };

    const display = () => {
        return assets.map((asset, index) => (
            {
                asset: asset,
                weight: weights[index],
                index: index
            }
        ));
    };

    const sum = (array) => array.reduce((acc, val) => acc + val, 0);

    return (
        <PortfolioContext.Provider value={{ assets, weight, index, error, message, removeMessage, updateMessage, removeAsset ,addAsset, investmentHorizon, updateInvestmentHorizon, display, portfolios, savePortfolio, portfolioName, savePortfolioName }}>
            {children}
        </PortfolioContext.Provider>
    );
}
