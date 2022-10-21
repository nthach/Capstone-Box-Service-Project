
from ast import Subscript
from django.contrib import admin
from .models import Product


# Register your models here to bring the tables to the backend Django admin site


admin.site.register(Product)
