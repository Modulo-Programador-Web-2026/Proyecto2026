from rest_framework import status
from rest_framework.test import APITestCase

from .models import CentroSalud


class CentroSaludApiTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.centro = CentroSalud.objects.create(
            nombre='Centro de prueba',
            direccion='Calle 123',
            barrio='Centro',
            localidad='Córdoba',
            telefono='3511234567',
            sitio_web='https://example.com/',
            latitud='-31.4166680',
            longitud='-64.1833340',
        )

    def test_listado_es_publico(self):
        response = self.client.get('/centros-salud/centros/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(
            any(centro['id'] == self.centro.id for centro in response.data)
        )

    def test_detalle_es_publico(self):
        response = self.client.get(f'/centros-salud/centros/{self.centro.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.centro.id)

    def test_detalle_inexistente_devuelve_404(self):
        response = self.client.get('/centros-salud/centros/999999/')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_no_permite_crear_centros(self):
        response = self.client.post('/centros-salud/centros/', {})

        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_datos_iniciales_respetan_longitudes(self):
        limites = {
            'nombre': 100,
            'direccion': 200,
            'barrio': 50,
            'localidad': 50,
            'telefono': 10,
            'sitio_web': 200,
        }

        for centro in CentroSalud.objects.all():
            for campo, limite in limites.items():
                self.assertLessEqual(len(getattr(centro, campo) or ''), limite)
