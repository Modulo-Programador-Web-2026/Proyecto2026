from django.shortcuts import render
from datetime import date
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Inscripcion
from .serializers import InscripcionSerializer
from campanias.models import Campania
from usuarios.models import Usuario, GrupoSanguineo


class InscripcionViewSet(viewsets.ModelViewSet):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer

    @action(detail=False, methods=['post'], url_path='inscribirse')
    def inscribirse(self, request):
        """
        POST /inscripciones/inscripciones/inscribirse/
        Body: { nombre, apellido, dni, grupo, campania_id }
        """
        nombre      = request.data.get('nombre')
        apellido    = request.data.get('apellido')
        dni         = request.data.get('dni')
        grupo_str   = request.data.get('grupo')    # ej: "A+"
        campania_id = request.data.get('campania_id')

        # Validar que vengan todos los campos
        if not all([nombre, apellido, dni, grupo_str, campania_id]):
            return Response(
                {'error': 'Todos los campos son requeridos.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Separar grupo y factor  ej: "AB+" → grupo="AB", factor="+"
        factor = grupo_str[-1]
        grupo  = grupo_str[:-1]

        # Buscar grupo sanguíneo en la BD
        try:
            grupo_obj = GrupoSanguineo.objects.get(grupo=grupo, factor=factor)
        except GrupoSanguineo.DoesNotExist:
            return Response(
                {'error': 'Grupo sanguíneo inválido.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Buscar campaña
        try:
            campania = Campania.objects.get(id=campania_id)
        except Campania.DoesNotExist:
            return Response(
                {'error': 'Campaña no encontrada.'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Buscar usuario por DNI o crearlo
        usuario, creado = Usuario.objects.get_or_create(
            dni=dni,
            defaults={
                'nombre':          nombre,
                'apellido':        apellido,
                'grupo_sanguineo': grupo_obj,
            }
        )

        # Verificar si ya está inscripto en esta campaña
        ya_inscripto = Inscripcion.objects.filter(
            usuario=usuario,
            campania=campania
        ).exists()

        if ya_inscripto:
            return Response(
                {'error': 'Este DNI ya está inscripto en esta campaña.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Crear inscripción
        inscripcion = Inscripcion.objects.create(
            usuario=usuario,
            campania=campania
        )

        return Response(
            {'mensaje': '¡Inscripción exitosa!', 'id': inscripcion.id},
            status=status.HTTP_201_CREATED
        )