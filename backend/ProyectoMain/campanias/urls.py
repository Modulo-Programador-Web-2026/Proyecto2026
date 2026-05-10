from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import CampaniaViewSet, campania_activa, EstadoCampaniaViewSet


router = DefaultRouter()
router.register(r'campanias', CampaniaViewSet)

router.register(r'estados-campania', EstadoCampaniaViewSet)

urlpatterns = [
    path('campanias/activa/', campania_activa),
] + router.urls
