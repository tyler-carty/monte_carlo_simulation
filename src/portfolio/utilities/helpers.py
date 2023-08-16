import yfinance as yf

def validate_asset(asset_name):
    try:
        # Fetch a short historical data to validate the ticker
        data = yf.download(asset_name, start="2022-01-01", end="2022-01-10")
        if data.empty:
            print(f"Error: {asset_name} is not a valid asset or there's no data available for the given period.")
            return False
        return True
    except Exception as e:
        print(f"Error: An issue occurred while fetching data for {asset_name}. Error message: {e}")
        return False