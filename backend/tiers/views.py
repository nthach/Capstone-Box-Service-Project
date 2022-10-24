
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Tiers
from .serializers import TiersSerializer


# Create your views here.


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_tiers(request):
    tier = Tiers.objects.all()
    serializer = TiersSerializer(tier, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def tier_requests(request, tier_id=0):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = TiersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        if request.GET['tier_id']==0:
            tier = Tiers.objects.all()
        else: 
            tier = Tiers.objects.filter(id=request.GET['tier_id'])  
        serializer = TiersSerializer(tier, many=True)
        return Response(serializer.data)
