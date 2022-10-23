from django.db import models


# Create your models here.
# models.py file is use for setting or formatting of the field of the tables
# models.py is a template for the data defining the fields for the tables and their properties

class Product(models.Model):
    product_name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)

