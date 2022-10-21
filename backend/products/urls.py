

from django.urls import path, include
from products import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<
#http://127.0.0.1:8000/api/products/
#http://127.0.0.1:8000/api/products/products_details/
urlpatterns = [
    path('', views.get_all_products),
    path('products_details/', views.user_products),
]


