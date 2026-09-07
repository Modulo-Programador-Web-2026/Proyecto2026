from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .models import Campania
from inscripciones.models import Inscripcion
from inscripciones.serializers import InscripcionSerializer
from .serializers import CampaniaSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.utils import timezone
from usuarios.permissions import EsAdministrador, EsUsuarioEstandar

@api_view(['GET'])
@permission_classes([AllowAny])
def campania_activa(request):
    campania = Campania.objects.order_by('fecha_inicio').first()
    if not campania:
        return Response({'error': 'No hay campañas.'}, status=404)
    return Response(CampaniaSerializer(campania).data)


@api_view(['POST'])
@permission_classes([EsUsuarioEstandar])
def inscribirse_campania(request, campania_id):
    campania = get_object_or_404(Campania, pk=campania_id)
    if campania.fecha_fin < timezone.localdate():
        return Response({
            'codigo': 'campania_finalizada',
            'mensaje': 'No podés inscribirte en una campaña finalizada.',
        }, status=status.HTTP_400_BAD_REQUEST)

    inscripcion, creada = Inscripcion.objects.get_or_create(
        usuario=request.user,
        campania=campania,
    )
    if not creada:
        return Response({
            'codigo': 'inscripcion_duplicada',
            'mensaje': 'Ya estás inscripto en esta campaña.',
        }, status=status.HTTP_409_CONFLICT)

    total = Inscripcion.objects.filter(campania=campania).count()
    return Response({
        'data': InscripcionSerializer(inscripcion).data,
        'totalInscriptos': total,
    }, status=status.HTTP_201_CREATED)

class CampaniaViewSet(viewsets.ModelViewSet):
    queryset = Campania.objects.select_related('centro_salud').all()
    serializer_class = CampaniaSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [EsAdministrador]
        return [permission() for permission in permission_classes]
