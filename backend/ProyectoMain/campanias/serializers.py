from rest_framework import serializers
from .models import Campania, Estado_Campania
from datetime import date

class CampaniaSerializer(serializers.ModelSerializer):

    estado_campania_texto = serializers.CharField(
        source='estado_campania.estado',
        read_only=True
        ) #campo adicional para mostrar el estado de la campaña como texto en lugar de solo el id

    estado_calculado = serializers.SerializerMethodField() #campo calculado para determinar el estado de la campaña en base a las fechas

    estado_campania = serializers.PrimaryKeyRelatedField(
        queryset=Estado_Campania.objects.all()
    )


    class Meta:
        model = Campania
        fields = '__all__'

    def get_estado_calculado(self, obj):
        hoy = date.today()
        if hoy < obj.fecha_inicio:
            return "Próximamente"
        elif hoy > obj.fecha_fin:
            return "Finalizada"
        return "En curso"
    


class EstadoCampaniaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Estado_Campania
        fields = '__all__'