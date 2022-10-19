from django.shortcuts import render

# Create your views here.


from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Subscription
from .serializers import SubscriptionSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_subscription(request):
    subscript = Subscription.objects.all()
    serializer = SubscriptionSerializer(subscript, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_subscription(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = SubscriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        subscript = Subscription.objects.filter(user_id=request.user.id)
        serializer = SubscriptionSerializer(subscript, many=True)
        return Response(serializer.data)

