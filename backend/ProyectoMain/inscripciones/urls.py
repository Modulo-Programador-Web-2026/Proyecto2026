from django.urls import path

from .views import inscribirse_campania, total_inscriptos


urlpatterns = [
    path(
        'campanias/<int:campania_id>/total/',
        total_inscriptos,
        name='total-inscriptos',
    ),
    path(
        'campanias/<int:campania_id>/',
        inscribirse_campania,
        name='inscribirse-campania',
    ),
]
