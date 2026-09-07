from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from campanias.models import Campania
from usuarios.permissions import EsUsuarioEstandar

from .models import Inscripcion
from .serializers import InscripcionSerializer


@api_view(['POST'])
@permission_classes([EsUsuarioEstandar])
def inscribirse_campania(request, campania_id):
    if request.data:
        return Response({
            'codigo': 'body_no_permitido',
            'mensaje': 'Este endpoint no recibe datos en el body.',
        }, status=status.HTTP_400_BAD_REQUEST)

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


@api_view(['GET'])
@permission_classes([AllowAny])
def total_inscriptos(request, campania_id):
    campania = get_object_or_404(Campania, pk=campania_id)
    total = Inscripcion.objects.filter(campania=campania).count()
    return Response({'totalInscriptos': total})
