from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Usuario, RolChoices
from .serializers import (
    CustomTokenObtainPairSerializer,
    RecuperarPasswordSerializer,
    UsuarioSerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from usuarios.permissions import EsAdministrador, EsAdministradorOSiMismo

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [EsAdministradorOSiMismo]
    lookup_value_regex = r'\d+'

    def get_queryset(self):
        if self.request.user.rol == RolChoices.ADMINISTRADOR:
            return Usuario.objects.all()
        return Usuario.objects.filter(
            pk=self.request.user.pk
        )

    def get_permissions(self):
        if self.action == 'create':
            return [EsAdministrador()]
        return [EsAdministradorOSiMismo()]


@api_view(['POST'])
@permission_classes([AllowAny])
def registro_view(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Usuario registrado correctamente'}, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def recuperar_password_view(request):
    serializer = RecuperarPasswordSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    email = serializer.validated_data['email']
    password = serializer.validated_data['password']
    usuario = Usuario.objects.filter(email__iexact=email).first()

    if usuario:
        usuario.set_password(password)
        usuario.save(update_fields=['password'])

    return Response({
        'message': (
            'Si existe una cuenta asociada a ese email, la contraseña fue '
            'actualizada. Ya podés intentar iniciar sesión.'
        )
    })

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

