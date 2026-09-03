from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, registro_view
from django.urls import path


router = DefaultRouter()

router.register(r'usuarios', UsuarioViewSet)

urlpatterns = router.urls +[
    path('registro/', registro_view),
]