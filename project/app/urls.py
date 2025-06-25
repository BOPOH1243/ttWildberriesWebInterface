# urls.py
from django.urls import path
from .views import start_parsing, product_list
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
#from drf_yasg.views import get_schema_view
#from drf_yasg import openapi
#
#schema_view = get_schema_view(
#    openapi.Info(
#        title="Wildberries Parser API",
#        default_version='v1',
#    ),
#    public=True,
#)

urlpatterns = [
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('api/parse/', start_parsing, name='start-parsing'),
    path('api/products/', product_list, name='product-list'),
]