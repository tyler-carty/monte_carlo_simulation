# This file contains the Portfolio class, which is used to create a portfolio of assets and perform Monte Carlo simulations on it.

# Import important libraries and modules
from utilities.helpers import validate_asset
import plotly.graph_objects as go
import yfinance as yf
import numpy as np
import csv

# Initialize Portfolio class
class Portfolio:

    def __init__(self):
        self.assets = []
        self.weights = []
        self.investment_horizon = None
        self.simulated_paths = None

    # Display portfolio
    def display(self):
        for asset, weight in zip(self.assets, self.weights):
            print(f"Asset: {asset} | Weight: {weight*100:.2f}%")
        print(f"Investment Horizon: {self.investment_horizon} days")

    # Visualize simulation
    def visualize_simulation(self):
        # If no paths are simulated yet, provide a warning
        if not self.simulated_paths:
            print("Please run the Monte Carlo simulation before visualizing results.")
            return

        # Visualization using Plotly
        # Calculate percentiles for each time step
        paths = self.simulated_paths
        lower_bound = np.percentile(paths, 5, axis=0)
        median = np.percentile(paths, 50, axis=0)
        upper_bound = np.percentile(paths, 95, axis=0)

        fig = go.Figure()

        fig.add_trace(go.Scatter(y=median, mode='lines', name='Median', line=dict(color='blue')))
        fig.add_trace(go.Scatter(y=lower_bound, mode='lines', name='5th Percentile', fill='tonexty', line=dict(color='red')))
        fig.add_trace(go.Scatter(y=upper_bound, mode='lines', name='95th Percentile', fill='tonexty', line=dict(color='green')))

        fig.update_layout(title='Monte Carlo Portfolio Simulation',
                          xaxis_title='Day',
                          yaxis_title='Portfolio Price',
                          showlegend=True)

        fig.show()

    # Add asset to portfolio
    def add_asset(self, asset_name, weight):
        if weight <= 0:
            print("Error: Weight should be a positive value.")
            return
        if sum(self.weights) + weight > 1:
            print("Error: Total weight exceeds 100%.")
            return
        if not validate_asset(asset_name):
            return
        self.assets.append(asset_name)
        self.weights.append(weight)

    # Set investment horizon
    def set_investment_horizon(self, days):
        if days <= 0 or days > 2520:
            print("Error: Investment horizon should be a positive integer and less than 2520 days (approx. 10 trading years).")
            return
        self.investment_horizon = days

    # Perform Monte Carlo simulation
    def monte_carlo_simulation(self, num_simulations=1000):
        if not self.assets or not self.weights or not self.investment_horizon:
            print("Error: Please add assets, weights and an investment horizon to the portfolio before performing simulations.")
            return
        
        # Get historical data for assets in the portfolio
        data = yf.download(self.assets, start="2020-01-01", end="2023-01-01")['Adj Close']

        # Calculate daily returns
        returns = data.pct_change()

        mean_daily_returns = returns.mean()

        if len(self.assets) > 1:
            # If there's more than one stock, calculate the covariance matrix.
            cov_matrix = returns.cov()
        else:
            # For a single stock, we don't have a covariance matrix. Instead, we just have a variance.
            variance = returns.var()
            std_dev = np.sqrt(variance)

        # Set up array to hold results
        results = np.zeros((3, num_simulations))

        for i in range(num_simulations):
            weights = np.array(self.weights)
            expected_portfolio_return = np.sum(mean_daily_returns * weights)

            # Calculate expected portfolio standard deviation, if there's more than one stock then use the covariance matrix
            if len(self.assets) > 1:
                weights = np.array(self.weights)
                expected_portfolio_return = np.sum(mean_daily_returns * weights)
                expected_portfolio_std_dev = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
            else:
                expected_portfolio_return = mean_daily_returns if isinstance(mean_daily_returns, float) else mean_daily_returns.iloc[0]  # This fetches the only value in the Series
                expected_portfolio_std_dev = std_dev


            # Logarithmically compound these returns
            log_return = np.log(1 + expected_portfolio_return)

            # Generate random sequence of returns under Normal distribution assumption
            random_returns = np.random.normal(log_return, expected_portfolio_std_dev, self.investment_horizon)
            
            # Convert these log returns to price points, starting from an initial price of 100 (indexing)
            price_sequence = [100]
            for j in range(1, len(random_returns)):
                price_sequence.append(price_sequence[j - 1] * np.exp(random_returns[j]))

            # Add this simulated price sequence to our array of simulated paths
            if self.simulated_paths is None:
                self.simulated_paths = [price_sequence]
            else:
                self.simulated_paths.append(price_sequence)
            
            # Append results to our results array
            results[0,i] = price_sequence[-1]
            results[1,i] = expected_portfolio_return
            results[2,i] = expected_portfolio_std_dev

        # Calculate risk and return metrics for these simulations
        portfolio_return = results[1].mean()
        portfolio_std_dev = results[2].mean()

        print(f"Simulated Average Portfolio Return (logarithmically compounded) over {self.investment_horizon} days: {portfolio_return*100:.2f}%")
        print(f"Simulated Average Portfolio Standard Deviation: {portfolio_std_dev*100:.2f}%")