from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import CampaniaViewSet, campania_activa, inscribirse_campania

router = DefaultRouter()
router.register(r'campanias', CampaniaViewSet)

urlpatterns = [
    path('campanias/activa/', campania_activa),
    path('campanias/<int:campania_id>/inscribirse/', inscribirse_campania),
] + router.urls
