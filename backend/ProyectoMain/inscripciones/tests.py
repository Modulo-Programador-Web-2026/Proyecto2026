from datetime import timedelta

from django.db import IntegrityError, transaction
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from campanias.models import Campania, EstadoCampaniaChoices
from usuarios.models import GrupoSanguineoChoices, RolChoices, Usuario

from .models import Inscripcion


class InscripcionUnicaTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.usuario = Usuario.objects.create_user(
            username='donante_prueba',
            email='donante@example.com',
            password='password-seguro',
            dni='12345678',
            nombre='Donante',
            apellido='Prueba',
            rol=RolChoices.USUARIO_ESTANDAR,
            grupo_sanguineo=GrupoSanguineoChoices.O_POSITIVO,
        )
        cls.campania = Campania.objects.create(
            titulo='Campaña para inscripciones',
            descripcion='Campaña destinada a probar inscripciones únicas por usuario.',
            ubicacion='Centro de prueba',
            fecha_inicio=timezone.localdate(),
            fecha_fin=timezone.localdate() + timedelta(days=1),
            estado_campania=EstadoCampaniaChoices.ACTIVA,
        )

    def setUp(self):
        self.client.force_authenticate(self.usuario)

    def test_api_no_permite_inscripcion_duplicada(self):
        url = '/inscripciones/inscripciones/'

        primera = self.client.post(url, {'campania': self.campania.id})
        segunda = self.client.post(url, {'campania': self.campania.id})

        self.assertEqual(primera.status_code, status.HTTP_201_CREATED)
        self.assertEqual(primera.data['totalInscriptos'], 1)
        self.assertEqual(segunda.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(segunda.data['codigo'], 'inscripcion_duplicada')
        self.assertEqual(
            segunda.data['mensaje'],
            'Ya estás inscripto en esta campaña.',
        )
        self.assertEqual(
            Inscripcion.objects.filter(
                usuario=self.usuario,
                campania=self.campania,
            ).count(),
            1,
        )

    def test_base_de_datos_no_permite_inscripcion_duplicada(self):
        Inscripcion.objects.create(
            usuario=self.usuario,
            campania=self.campania,
        )

        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                Inscripcion.objects.create(
                    usuario=self.usuario,
                    campania=self.campania,
                )
