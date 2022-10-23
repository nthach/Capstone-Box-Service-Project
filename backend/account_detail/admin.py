from ast import Subscript
from django.contrib import admin
from .models import Account_Detail


# Register your models here to bring the tables to the backend Django admin site
# admin.py file is for registering your models.py to use throughout the site


admin.site.register(Account_Detail)