from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet,RolViewSet, GrupoSanguineoViewSet, registro_view
from django.urls import path


router = DefaultRouter()

router.register(r'usuarios', UsuarioViewSet)

router.register(r'rol', RolViewSet)

router.register(r'grupos-sanguineos', GrupoSanguineoViewSet)

urlpatterns = router.urls +[
    path('registro/', registro_view),
]