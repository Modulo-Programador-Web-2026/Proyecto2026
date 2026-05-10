from rest_framework import serializers

from .models import Usuario,Rol,GrupoSanguineo


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = [
            'id',
            'username',
            'email',
            'password',  
            'dni',
            'nombre',
            'apellido',
            'fecha_registro',
            'rol',
            'grupo_sanguineo'
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Usuario(**validated_data)
        user.set_password(password)  
        user.save()
        return user
    

class RolSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rol
        fields = '__all__'

class GrupoSanguineoSerializer(serializers.ModelSerializer):

    class Meta:
        model = GrupoSanguineo
        fields = '__all__'