import numpy as np
import yfinance as yf
import matplotlib.pyplot as plt
import plotly.graph_objects as go

# Define the tickers of your assets
assets = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NFLX", "JPM", "PG", "JNJ", "V", "KO", "BA", "INTC", "DIS", "GS", "NKE", "XOM", "WMT", "IBM"]

# Fetch data
data = yf.download(assets, start="2010-01-01", end="2023-01-01", group_by='ticker')

# This will give you Open, High, Low, Close, Volume, and Dividends & Stock Splits data for each asset.

# Filtering Relevant Data
# For most quantitative analyses, you'll be interested in adjusted closing prices, which take into account dividends and stock splits.
adj_close = data.loc[:, (slice(None), 'Adj Close')].copy()
adj_close.columns = adj_close.columns.droplevel(1)

# Handling Missing Data
# Ensure that there are no missing values in your dataset. If there are, decide on a strategy to address them (e.g., forward fill, backward fill, interpolation, or dropping them).
adj_close = adj_close.fillna(method='ffill')  # Forward fill

# Calculate daily returns
# Returns provide insights into the relative change in prices, which are pivotal for risk assessments and simulations.
daily_returns = adj_close.pct_change().dropna()

daily_returns.to_csv('daily_returns.csv')

# Data Visualization:
# It's often helpful to visualize your data to understand trends and anomalies.

# Plotting the daily returns of AAPL as an example
# daily_returns['AAPL'].plot(figsize=(10, 6))
# plt.title('AAPL Daily Returns')
# plt.ylabel('Daily Returns')
# plt.xlabel('Date')
# plt.show()

# Assuming daily_returns is your DataFrame of historical daily returns

# Define portfolio weights - for this example, we're using equal weights
weights = np.array([1/20] * 20)

# Number of simulations and time horizon
num_simulations = 10000
time_horizon = 252  # Number of trading days in a year

results = np.zeros((3, num_simulations))
for i in range(num_simulations):
    daily_portfolio_returns = np.dot(daily_returns.sample(n=time_horizon, replace=True), weights)
    results[0,i] = np.prod(daily_portfolio_returns + 1) - 1  # cumulative return
    results[1,i] = daily_portfolio_returns.mean()
    results[2,i] = daily_portfolio_returns.std()

# Extracting cumulative returns for visualization or further analysis
cumulative_returns = results[0]

# Calculating 5% VaR
var_5_percentile = np.percentile(cumulative_returns, 5)

# Calculating Expected Shortfall for the bottom 5%
expected_shortfall_5 = cumulative_returns[cumulative_returns < var_5_percentile].mean()

# Create histogram
fig = go.Figure(data=[go.Histogram(x=cumulative_returns, nbinsx=50, name='Returns Distribution')])

# Add VaR and Expected Shortfall lines
fig.add_shape(go.layout.Shape(type='line',
                              x0=var_5_percentile, x1=var_5_percentile, y0=0, y1=1, yref='paper',
                              line=dict(color='Red', dash='dash')))
fig.add_shape(go.layout.Shape(type='line',
                              x0=expected_shortfall_5, x1=expected_shortfall_5, y0=0, y1=1, yref='paper',
                              line=dict(color='Green', dash='dash')))

# Add annotations
fig.add_annotation(x=var_5_percentile, y=0.95, yref='paper', text=f'5% VaR: {var_5_percentile:.2%}', 
                   showarrow=True, arrowhead=5, ax=0, ay=-40)
fig.add_annotation(x=expected_shortfall_5, y=0.85, yref='paper', text=f'ES (at 5%): {expected_shortfall_5:.2%}', 
                   showarrow=True, arrowhead=5, ax=0, ay=-40)

# Update layout & show
fig.update_layout(title='Distribution of Cumulative Returns', xaxis_title='Cumulative Returns', yaxis_title='Frequency')
fig.show()
