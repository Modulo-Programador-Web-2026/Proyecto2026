from rest_framework import serializers
from .models import Inscripcion

class InscripcionSerializer(serializers.ModelSerializer):

    class Meta:

        model = Inscripcion

        fields = [
            'id',
            'campania',
            'fecha_inscripcion',
            'usuario'
        ]

        read_only_fields = [
            'usuario',
            'fecha_inscripcion'
        ]

    def validate(self, attrs):
        request = self.context.get('request')
        usuario = self.instance.usuario if self.instance else request.user
        campania = attrs.get(
            'campania',
            self.instance.campania if self.instance else None,
        )

        inscripciones = Inscripcion.objects.filter(
            usuario=usuario,
            campania=campania,
        )
        if self.instance:
            inscripciones = inscripciones.exclude(pk=self.instance.pk)

        if inscripciones.exists():
            raise serializers.ValidationError({
                'campania': 'Ya estás inscripto en esta campaña.'
            })

        return attrs
