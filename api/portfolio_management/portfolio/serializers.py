from rest_framework import serializers
from .models import Portfolio, Asset

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ('id', 'asset_name', 'weight')

class PortfolioSerializer(serializers.ModelSerializer):
    assets = AssetSerializer(many=True)

    class Meta:
        model = Portfolio
        fields = ('id', 'name', 'investment_horizon', 'assets')

    def create(self, validated_data):
        assets_data = validated_data.pop('assets')
        portfolio = Portfolio.objects.create(**validated_data)
        for asset_data in assets_data:
            Asset.objects.create(portfolio=portfolio, **asset_data)
        return portfolio