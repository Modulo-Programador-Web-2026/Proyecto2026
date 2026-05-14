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

    