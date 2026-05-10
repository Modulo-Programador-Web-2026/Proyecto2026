from rest_framework import serializers

from campanias.serializers import CampaniaSerializer

class InscripcionPorMesSerializer(serializers.Serializer):
    mes = serializers.IntegerField()
    cantidad = serializers.IntegerField()

class DashboardSerializer(serializers.Serializer):

    total_campanias = serializers.IntegerField()
    total_inscripciones = serializers.IntegerField()
    total_donantes = serializers.IntegerField()
    campanias_recientes = CampaniaSerializer(
        many=True
    )
    inscripciones_por_mes = InscripcionPorMesSerializer(
        many=True
    )