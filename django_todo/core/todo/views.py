from django.shortcuts import render, HttpResponse, get_object_or_404
from django.http import JsonResponse
from rest_framework import viewsets
from .serializer import *
from django.contrib.auth.models import User
from .models import *
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthor
from rest_framework.response import Response








class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerilizer
    queryset = Todo.objects.all()

    def list(self, request):
        queryset = Todo.objects.filter(user = request.user)
        serializer = TodoSerilizer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        #inheritance from ModelViewSet create method
        super().create(request)

        #get added task
        todo = Todo.objects.all().last()
        
        #get categroy
        category = get_object_or_404(Category, uuid = request.data["category"])
        category.todo_set.add(todo)
        
        return JsonResponse({"hello":"hi"})

    
    def get_permissions(self):
        if self.action in ["create", "list"]:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthor]
        
        return [permission() for permission in permission_classes]

    

   


class CatergoryViewSet(viewsets.ModelViewSet):
    serializer_class = CatergorySerializer
    queryset = Category.objects.all()

    def list(self, request):
        queryset = Category.objects.filter(user = request.user)
        serializer = CatergorySerializer(queryset, many=True)
        return Response(serializer.data)


    def get_permissions(self):
        if self.action in ["create", "list"]:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthor]
        
        return [permission() for permission in permission_classes]

    

    


class CategoryItems(ListAPIView): 
    serializer_class = TodoSerilizer

    def get_queryset(self):
        a = Todo.objects.filter(category = self.kwargs.get("pk"))
        return a



   
    
