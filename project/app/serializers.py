# serializers.py
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'price', 'sale_price', 'rating', 'feedbacks', 'query']

class ParseRequestSerializer(serializers.Serializer):
    query = serializers.CharField(max_length=100)