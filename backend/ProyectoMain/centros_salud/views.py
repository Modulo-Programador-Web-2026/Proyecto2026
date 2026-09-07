from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import CentroSalud
from .serializers import CentroSaludSerializer


class CentroSaludViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CentroSalud.objects.all()
    serializer_class = CentroSaludSerializer
    permission_classes = [AllowAny]
    lookup_value_regex = r'\d+'
