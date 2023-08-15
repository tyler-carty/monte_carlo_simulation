import yfinance as yf

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

# Data Visualization:
# It's often helpful to visualize your data to understand trends and anomalies.

import matplotlib.pyplot as plt

# Plotting the daily returns of AAPL as an example
daily_returns['AAPL'].plot(figsize=(10, 6))
plt.title('AAPL Daily Returns')
plt.show()

daily_returns.to_csv('daily_returns.csv')