from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Inscripcion


@api_view(['GET'])
@permission_classes([AllowAny])
def total_inscriptos(request):
    campania_id = request.query_params.get('campania')
    if not campania_id:
        return Response(
            {'campania': 'El identificador de la campaña es obligatorio.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    total = Inscripcion.objects.filter(campania_id=campania_id).count()
    return Response({'totalInscriptos': total})
