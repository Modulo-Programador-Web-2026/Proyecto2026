from rest_framework import serializers
from .models import Campania, EstadoCampaniaChoices
from datetime import date

class CampaniaSerializer(serializers.ModelSerializer):

    estado_calculado = serializers.SerializerMethodField() 

    class Meta:
        model = Campania
        fields = '__all__'

    def get_estado_calculado(self, obj):
        hoy = date.today()
        if hoy < obj.fecha_inicio:
            return EstadoCampaniaChoices.PROXIMAMENTE
        elif hoy > obj.fecha_fin:
            return EstadoCampaniaChoices.FINALIZADA
        return EstadoCampaniaChoices.ACTIVA