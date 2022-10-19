from rest_framework import serializers
from .models import Car

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<
# serializer.py file take the models.py and converts it to .json format

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'make', 'model', 'year', 'user_id']
        depth = 1
