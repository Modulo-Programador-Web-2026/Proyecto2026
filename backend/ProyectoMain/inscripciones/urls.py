from django.urls import path

from .views import total_inscriptos


urlpatterns = [
    path('total/', total_inscriptos, name='total-inscriptos'),
]
