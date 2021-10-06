from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User






class TodoSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"



class CatergorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


    
    
