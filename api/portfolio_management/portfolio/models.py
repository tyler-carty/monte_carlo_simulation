from django.db import models
import json

class Portfolio(models.Model):
    assets = models.JSONField()  # Store the list of assets. E.g. ["AAPL", "GOOGL"]
    weights = models.JSONField()  # Store the weights of assets. E.g. [0.5, 0.5]
    investment_horizon = models.PositiveIntegerField()  # Store the investment horizon, in years or months.
    simulated_paths = models.JSONField()  # Store the array of simulated paths. E.g [[100, 100.74241674522814, 98.43625605270994, 97.31702119608364, 94.7107302542069]]
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Portfolio {self.id} - {self.date_created.strftime('%Y-%m-%d')}"

    def add_simulated_path(self, path):
        current_paths = json.loads(self.simulated_paths)
        current_paths.append(path)
        self.simulated_paths = json.dumps(current_paths)
        self.save()

