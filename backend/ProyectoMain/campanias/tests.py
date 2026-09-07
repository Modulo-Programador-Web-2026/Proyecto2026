from datetime import timedelta

from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from centros_salud.models import CentroSalud

from .models import Campania, EstadoCampaniaChoices
from .serializers import CampaniaSerializer


class CampaniaCentroSaludTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.centro = CentroSalud.objects.get(pk=1)
        cls.campania = Campania.objects.create(
            titulo='Campaña vinculada a un centro',
            descripcion='Campaña creada para comprobar los datos del centro asociado.',
            ubicacion='Sede de prueba',
            centro_salud=cls.centro,
            fecha_inicio=timezone.localdate() + timedelta(days=1),
            fecha_fin=timezone.localdate() + timedelta(days=2),
            estado_campania=EstadoCampaniaChoices.PROXIMAMENTE,
        )

    def test_detalle_incluye_centro_salud(self):
        response = self.client.get(
            f'/campanias/campanias/{self.campania.id}/'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['centro_salud'], self.centro.id)
        self.assertEqual(
            response.data['centro_salud_detalle']['nombre'],
            self.centro.nombre,
        )
        self.assertIn('latitud', response.data['centro_salud_detalle'])
        self.assertIn('longitud', response.data['centro_salud_detalle'])

    def test_serializer_recibe_id_del_centro(self):
        inicio = timezone.localdate() + timedelta(days=3)
        serializer = CampaniaSerializer(data={
            'titulo': 'Nueva campaña con centro',
            'descripcion': 'Campaña válida asociada mediante el identificador del centro.',
            'ubicacion': 'Ubicación temporal',
            'centro_salud': self.centro.id,
            'fecha_inicio': inicio,
            'fecha_fin': inicio + timedelta(days=1),
        })

        self.assertTrue(serializer.is_valid(), serializer.errors)
        campania = serializer.save()
        self.assertEqual(campania.centro_salud, self.centro)
