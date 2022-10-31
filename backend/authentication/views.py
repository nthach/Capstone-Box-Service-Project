from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer, UserSerializer
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes




User = get_user_model()

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
