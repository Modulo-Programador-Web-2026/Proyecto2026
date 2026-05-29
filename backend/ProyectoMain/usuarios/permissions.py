from rest_framework.permissions import BasePermission

class EsAdministrador(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.rol
            and request.user.rol.tipo_rol.upper() == 'Administrador'.upper()
        )