from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Usuario, Rol, GrupoSanguineo
from django.contrib.auth import authenticate

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

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):

        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            username=email,
            password=password
        )

        if user is None:
            raise serializers.ValidationError(
                'Credenciales incorrectas'
            )

        refresh = self.get_token(user)

        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),

            'user': {
                'id': user.id,
                'email': user.email,
                'rol': user.rol.tipo_rol if user.rol else None
            }
        }

        return data

    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)

        token['id'] = user.id
        token['email'] = user.email
        token['rol'] = user.rol.tipo_rol if user.rol else None

        return token