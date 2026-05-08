from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import Usuario
from .serializers import UsuarioSerializer


class UsuarioViewSet(viewsets.ModelViewSet):

    queryset = Usuario.objects.all()

    serializer_class = UsuarioSerializer


@api_view(['POST'])
def login_view(request):

    email = request.data.get('email')

    password = request.data.get('password')

    user = authenticate(
        username=email,
        password=password
    )

    if user is not None:

        return Response({

            'message': 'Login correcto',

            'user': {
                'id': user.id,
                'email': user.email
            }

        }, status=200)

    return Response({

        'error': 'Credenciales incorrectas'

    }, status=400)