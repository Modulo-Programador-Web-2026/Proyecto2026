from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, recuperar_password_view, registro_view
from django.urls import path


router = DefaultRouter()

router.register(r'', UsuarioViewSet, basename='usuario')

urlpatterns = [
    path('registro/', registro_view),
    path('recuperar-password/', recuperar_password_view),
] + router.urls
