from django.http import JsonResponse
import yfinance as yf

def validate_asset(request, asset_name):
    try:
        data = yf.download(asset_name, start="2022-01-01", end="2022-01-10")
        if data.empty:
            return JsonResponse({'isValid': False, 'error': f"{asset_name} is not a valid asset or there's no data available for the given period."})
        return JsonResponse({'isValid': True})
    except Exception as e:
        return JsonResponse({'isValid': False, 'error': f"An issue occurred while fetching data for {asset_name}. Error message: {e}"})
