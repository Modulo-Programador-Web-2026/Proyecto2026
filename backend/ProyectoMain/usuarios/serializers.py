from rest_framework import serializers

from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = [
            'id',
            'username',
            'email',
            'dni',
            'nombre',
            'apellido',
            'fecha_registro',
            'rol',
            'grupo_sanguineo'
        ]