from django.http import JsonResponse
import yfinance as yf
from rest_framework import generics
from .models import Portfolio
from .serializers import PortfolioSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

class PortfolioListCreateView(generics.ListCreateAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

class PortfolioDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

def validate_asset(request, asset_name):
    try:
        data = yf.download(asset_name, start="2022-01-01", end="2022-01-10")
        if data.empty:
            return JsonResponse({'isValid': False, 'error': f"{asset_name} is not a valid asset or there's no data available for the given period."})
        return JsonResponse({'isValid': True})
    except Exception as e:
        return JsonResponse({'isValid': False, 'error': f"An issue occurred while fetching data for {asset_name}. Error message: {e}"})
    
@api_view(['GET'])
def get_all_portfolios(request):
    portfolios = Portfolio.objects.all()
    serializer = PortfolioSerializer(portfolios, many=True)
    return Response(serializer.data)

def load_portfolio(request):
    if request.method == 'POST':
        selected_portfolio_id = request.POST.get('selected_portfolio')
        portfolio = Portfolio.objects.get(pk=selected_portfolio_id)
        
        # Now, you can do whatever you want with this portfolio, 
        # e.g., redirect to a page where this portfolio's details are displayed
        return redirect('portfolio_detail_view', pk=selected_portfolio_id)

    return redirect('get_all_portfolios')