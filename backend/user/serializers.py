
from rest_framework import serializers
from authentication.models import User


# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<
# serializer.py file take the models.py and converts it to .json format


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'username', 'password', 'email',
                  'first_name', 'last_name', 'is_superuser']
        depth = 1


