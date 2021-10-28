from rest_framework import routers
from .views import *
from django.urls import path, include



router = routers.SimpleRouter()
router.register("todo", TodoViewSet, basename = "todo")
router.register("category", CatergoryViewSet, basename = "category")

urlpatterns = [
    path("listitem/<uuid:pk>/", CategoryItems.as_view(), name = "listitem")
]

urlpatterns += router.urls