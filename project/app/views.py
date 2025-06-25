# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from .models import Product
from .serializers import ProductSerializer, ParseRequestSerializer
import requests

@extend_schema(
    request={
        'application/json': {
            'example': {
                'query': 'телефон',
            }
        }
    },
    responses={
        200: {
            'description': 'Парсинг запущен',
            'examples': {
                'application/json': {
                    'status': 'success',
                    'query': 'телефон',
                }
            }
        },
        400: {
            'description': 'Неверный запрос',
            'examples': {
                'application/json': {
                    'query': ['Это поле обязательно.']
                }
            }
        }
    },
    methods=['POST'],
    description='Запускает парсинг товаров с Wildberries по заданному запросу.'
)
@api_view(['POST'])
def start_parsing(request):
    """Запуск парсинга товаров по запросу."""
    serializer = ParseRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    query = serializer.validated_data['query']
    parse_wildberries(query)  # Вызываем парсер
    return Response({"status": "success", "query": query})

@extend_schema(
    parameters=[
        OpenApiParameter(
            name='min_price',
            type=float,
            description='Минимальная цена товара',
            examples=[
                OpenApiExample('Пример 1', value=5000),
                OpenApiExample('Пример 2', value=10000),
            ],
        ),
        OpenApiParameter(
            name='min_rating',
            type=float,
            description='Минимальный рейтинг товара (от 1 до 5)',
            examples=[OpenApiExample('Пример', value=4.0)],
        ),
    ],
    description='Возвращает список товаров с возможностью фильтрации.',
    responses={
        200: {
            'description': 'Список товаров',
            'examples': {
                'application/json': [
                    {
                        'name': 'Смартфон Xiaomi',
                        'price': 19999.0,
                        'sale_price': 17999.0,
                        'rating': 4.5,
                        'feedbacks': 120,
                    }
                ]
            }
        }
    }
)
@api_view(['GET'])
def product_list(request):
    """Список товаров с фильтрами."""
    queryset = Product.objects.all()
    
    # Фильтрация
    filters = {
        'price__gte': request.query_params.get('min_price'),
        'price__lte': request.query_params.get('max_price'),
        'rating__gte': request.query_params.get('min_rating'),
        'feedbacks__gte': request.query_params.get('min_feedbacks'),
        'query__icontains': request.query_params.get('query'),
    }
    filters = {k: v for k, v in filters.items() if v is not None}
    queryset = queryset.filter(**filters)
    
    serializer = ProductSerializer(queryset, many=True)
    return Response(serializer.data)

# Парсер (вынесен в отдельную функцию)
def parse_wildberries(query: str, limit=100):
    url = "https://search.wb.ru/exactmatch/ru/common/v4/search"
    params = {
        "query": query,
        "resultset": "catalog",
        "limit": limit,
        "sort": "popular",
        "dest": -1257786,
        "appType": 1,
    }
    headers = {"User-Agent": "Mozilla/5.0"}
    
    response = requests.get(url, params=params, headers=headers)
    if response.status_code == 200:
        products = response.json().get("data", {}).get("products", [])
        for item in products:
            Product.objects.update_or_create(
                name=item.get("name"),
                defaults={
                    "price": item.get("priceU", 0) / 100,
                    "sale_price": item.get("salePriceU", 0) / 100,
                    "rating": item.get("reviewRating", 0),
                    "feedbacks": item.get("feedbacks", 0),
                    "query": query,
                }
            )