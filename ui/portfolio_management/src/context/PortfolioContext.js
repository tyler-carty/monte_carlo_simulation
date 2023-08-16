import React, { useState, createContext } from 'react';
import axios from 'axios';

// Create the context
export const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
    const [assets, setAssets] = useState([]);
    const [weights, setWeights] = useState([]);
    const [error, setError] = useState(null);
    const [weight] = useState([]);
    const [index] = useState(0);

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

    const addAsset = (assetName, weight) => {

        if (weight <= 0) {
            setError("Weight should be a positive value.");
            return;
        }

        if (sum(weights) + weight > 1) {
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
        });
    };

    const removeAsset = (asset, weight, index) => {
        setAssets(prev => prev.filter((_, i) => i !== index));
        setWeights(prev => prev.filter((_, i) => i !== index));
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
        <PortfolioContext.Provider value={{ assets, weight, index, error, addAsset, removeAsset, display }}>
            {children}
        </PortfolioContext.Provider>
    );
}
