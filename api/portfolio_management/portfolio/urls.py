from django.urls import path
from . import views

urlpatterns = [
    # ... other routes
    path('validate_asset/<str:asset_name>/', views.validate_asset, name='validate_asset'),
    path('portfolios/', views.PortfolioListCreateView.as_view(), name='portfolio-list-create'),
    path('portfolios/<int:pk>/', views.PortfolioDetailView.as_view(), name='portfolio-detail'),
    path('api/portfolios/', views.get_all_portfolios, name='get_all_portfolios'),
    path('load_portfolio/', views.load_portfolio, name='load_portfolio'),
]