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

    def create(self, request, *args, **kwargs):  
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        campania_id = request.data.get('campania') 
        total = Inscripcion.objects.filter(campania_id=campania_id).count()
        return Response({
            'data': serializer.data,
            'totalInscriptos': total
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'], url_path='total')  
    def total(self, request):
        campania_id = request.query_params.get('campania')
        total = Inscripcion.objects.filter(campania_id=campania_id).count()
        return Response({ 'totalInscriptos': total })