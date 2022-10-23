#Using the cars app as a reference, finish serializers.py and views.py in the subscription app

from rest_framework import serializers
from .models import Product

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_name', 'description']
        depth = 1


