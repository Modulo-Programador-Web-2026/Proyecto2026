from rest_framework.permissions import BasePermission
from usuarios.models import RolChoices

class EsAdministrador(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.rol
            and request.user.rol == RolChoices.ADMINISTRADOR
        )