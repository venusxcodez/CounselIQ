from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello from DRF!"})

@api_view(['GET'])
def test_connection(request):
    return Response({"message": "Hello React, this is Django!"})