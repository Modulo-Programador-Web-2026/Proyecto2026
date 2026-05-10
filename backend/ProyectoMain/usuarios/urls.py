from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet,RolViewSet, GrupoSanguineoViewSet


router = DefaultRouter()

router.register(r'usuarios', UsuarioViewSet)

router.register(r'rol', RolViewSet)

router.register(r'grupos-sanguineos', GrupoSanguineoViewSet)

urlpatterns = router.urls