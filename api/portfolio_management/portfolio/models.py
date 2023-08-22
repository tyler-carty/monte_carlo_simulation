from django.db import models
from django.contrib.auth.models import User  # Import the default User model

class Portfolio(models.Model):
    name = models.CharField(max_length=255)
    investment_horizon = models.IntegerField()  # This field stores the investment horizon

    def __str__(self):
        return self.name

class Asset(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name="assets")
    asset_name = models.CharField(max_length=255)
    weight = models.DecimalField(max_digits=5, decimal_places=2)  # Assuming weight is a decimal value

    def __str__(self):
        return self.asset_name