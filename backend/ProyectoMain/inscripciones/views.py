from django.db import IntegrityError, transaction
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Inscripcion
from .serializers import InscripcionSerializer


class InscripcionViewSet(viewsets.ModelViewSet):
    
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer
    
    def create(self, request, *args, **kwargs):
        campania_id = request.data.get('campania')
        if Inscripcion.objects.filter(
            usuario=request.user,
            campania_id=campania_id,
        ).exists():
            return Response({
                'codigo': 'inscripcion_duplicada',
                'mensaje': 'Ya estás inscripto en esta campaña.',
            }, status=status.HTTP_409_CONFLICT)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            with transaction.atomic():
                serializer.save(usuario=request.user)
        except IntegrityError:
            return Response({
                'codigo': 'inscripcion_duplicada',
                'mensaje': 'Ya estás inscripto en esta campaña.',
            }, status=status.HTTP_409_CONFLICT)

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
