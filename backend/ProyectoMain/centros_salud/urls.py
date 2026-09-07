from rest_framework.routers import DefaultRouter

from .views import CentroSaludViewSet


router = DefaultRouter()
router.register(r'centros', CentroSaludViewSet)

urlpatterns = router.urls
