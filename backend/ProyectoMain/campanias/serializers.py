from rest_framework import serializers

from .models import Campania


class CampaniaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Campania
        fields = '__all__'