from rest_framework.routers import DefaultRouter

from .views import CentroSaludViewSet


router = DefaultRouter()
router.register(r'', CentroSaludViewSet, basename='centro-salud')

urlpatterns = router.urls
