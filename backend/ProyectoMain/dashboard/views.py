from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count
from django.db.models.functions import ExtractMonth
from campanias.models import Campania
from campanias.serializers import CampaniaSerializer
from inscripciones.models import Inscripcion
from usuarios.models import Usuario
from .serializers import DashboardSerializer
from usuarios.permissions import EsAdministrador

class DashboardView(APIView):

    permission_classes = [EsAdministrador]

    def get(self, request):

        total_campanias = Campania.objects.count()
        total_inscripciones = Inscripcion.objects.count()
        total_donantes = Usuario.objects.filter(inscripcion__isnull=False).distinct().count()
        campanias_recientes = Campania.objects.order_by('-fecha_inicio')[:5]
        inscripciones_por_mes = Inscripcion.objects.annotate(
            mes=ExtractMonth('fecha_inscripcion')
        ).values('mes').annotate(cantidad=Count('id')).order_by('mes')

        data = {
            'total_campanias': total_campanias,
            'total_inscripciones': total_inscripciones,
            'total_donantes': total_donantes,
            'campanias_recientes': campanias_recientes,
            'inscripciones_por_mes': inscripciones_por_mes
        }

        serializer = DashboardSerializer(data)

        return Response(serializer.data)