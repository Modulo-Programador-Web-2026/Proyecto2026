from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import Usuario,Rol, GrupoSanguineo
from .serializers import UsuarioSerializer,RolSerializer, GrupoSanguineoSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny

class UsuarioViewSet(viewsets.ModelViewSet):

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class RolViewSet(viewsets.ModelViewSet):

    queryset = Rol.objects.all()
    serializer_class = RolSerializer

class GrupoSanguineoViewSet(viewsets.ModelViewSet):

    queryset = GrupoSanguineo.objects.all()
    serializer_class = GrupoSanguineoSerializer
    permission_classes = [AllowAny]

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(
        request=request,
        username=email,
        password=password
    )

    if user is not None:
        return Response({
            'message': 'Login correcto',
            'user': {
                'id': user.id,
                'email': user.email,
                'rol': user.rol.tipo_rol if user.rol else None  
            }
        }, status=200)

    return Response({'error': 'Credenciales incorrectas'}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def registro_view(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Usuario registrado correctamente'}, status=201)
    return Response(serializer.errors, status=400)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer