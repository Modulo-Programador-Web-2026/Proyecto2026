from rest_framework import serializers

from .models import Campania, Estado_Campania


class CampaniaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Campania
        fields = '__all__'


class EstadoCampaniaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Estado_Campania
        fields = '__all__'