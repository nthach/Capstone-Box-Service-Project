#Using the cars app as a reference, finish serializers.py and views.py in the subscription app

from rest_framework import serializers
from .models import Subscription

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<
# serializer.py file take the models.py and converts it to .json format


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['user','skin_care_product', 'cosmetic_product', 'fragrance_product', 'tier']
        depth = 1