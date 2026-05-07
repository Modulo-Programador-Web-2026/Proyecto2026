from rest_framework.routers import DefaultRouter

from .views import CampaniaViewSet


router = DefaultRouter()

router.register(r'campanias', CampaniaViewSet)

urlpatterns = router.urls