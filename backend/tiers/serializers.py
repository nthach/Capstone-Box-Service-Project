
from rest_framework import serializers
from .models import Tiers

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<
# serializer.py file take the models.py and converts it to .json format


class TiersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tiers
        fields = ['tier_name', 'tier_price']
        depth = 1