from rest_framework import serializers
from .models import Account_Detail


# serializer.py file take the models.py and converts it to .json format

class AccountDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account_Detail
        fields = ['id', 'account_detail', 'products', 'subscription', 'user_id', 'tiers']
        depth = 1