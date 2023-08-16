from django.urls import path
from . import views

urlpatterns = [
    # ... other routes
    path('validate_asset/<str:asset_name>/', views.validate_asset, name='validate_asset'),
]