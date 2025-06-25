# models.py
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.FloatField()
    feedbacks = models.IntegerField()
    query = models.CharField(max_length=100)  # Поисковый запрос
    created_at = models.DateTimeField(auto_now_add=True)