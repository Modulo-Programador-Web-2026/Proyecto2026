from django.shortcuts import render
from rest_framework import viewsets
from .models import Campania
from .serializers import CampaniaSerializer


class CampaniaViewSet(viewsets.ModelViewSet):

    queryset = Campania.objects.all()

    serializer_class = CampaniaSerializer