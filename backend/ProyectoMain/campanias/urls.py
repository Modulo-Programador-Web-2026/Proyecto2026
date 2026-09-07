from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import CampaniaViewSet, campania_activa

router = DefaultRouter()
router.register(r'', CampaniaViewSet, basename='campania')

urlpatterns = [
    path('activa/', campania_activa),
] + router.urls
