from django.shortcuts import render, HttpResponse
from rest_framework import viewsets
from .serializer import *
from django.contrib.auth.models import User
from .models import *



class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerilizer
    queryset = Todo.objects.all()


class CatergoryViewSet(viewsets.ModelViewSet):
    serializer_class = CatergorySerializer
    queryset = Category.objects.all()

    


   
    
