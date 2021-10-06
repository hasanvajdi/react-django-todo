from rest_framework import routers
from .views import *

router = routers.SimpleRouter()
router.register("todo", TodoViewSet, basename = "todo")
router.register("category", CatergoryViewSet, basename = "category")

urlpatterns = router.urls