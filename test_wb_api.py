import requests

def get_wildberries_products(search_query, limit=10):
    url = "https://search.wb.ru/exactmatch/ru/common/v4/search"
    params = {
        "query": search_query,
        "resultset": "catalog",
        "limit": limit,
        "sort": "popular",
        "dest": -1257786,
        "appType": 1,
    }
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    response = requests.get(url, params=params, headers=headers)
    if response.status_code == 200:
        data = response.json()
        products = []
        for product in data.get("data", {}).get("products", []):
            products.append({
                "Название": product.get("name"),
                "Цена": product.get("priceU") / 100 if product.get("priceU") else None,
                "Цена со скидкой": product.get("salePriceU") / 100 if product.get("salePriceU") else None,
                "Рейтинг": product.get("reviewRating"),
                "Количество отзывов": product.get("feedbacks")
            })
        return products
    else:
        print("Ошибка запроса:", response.status_code)
        return []

# Пример использования
products = get_wildberries_products("ноутбук", 5)
for product in products:
    print(product)