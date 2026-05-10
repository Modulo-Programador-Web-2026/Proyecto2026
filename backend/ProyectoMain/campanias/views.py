from django.shortcuts import render
from rest_framework import viewsets
from .models import Campania, Estado_Campania
from .serializers import CampaniaSerializer, EstadoCampaniaSerializer
from datetime import date
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def campania_activa(request):
    campania = Campania.objects.order_by('fecha_inicio').first()

    if not campania:
        return Response({'error': 'No hay campañas.'}, status=404)

    return Response(CampaniaSerializer(campania).data)



class CampaniaViewSet(viewsets.ModelViewSet):
    queryset = Campania.objects.all()
    serializer_class = CampaniaSerializer


class EstadoCampaniaViewSet(viewsets.ModelViewSet):

    queryset = Estado_Campania.objects.all()

    serializer_class = EstadoCampaniaSerializer