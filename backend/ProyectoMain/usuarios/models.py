from django.contrib.auth.models import AbstractUser
from django.db import models



class Rol(models.Model):
    tipo_rol= models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.tipo_rol

class GrupoSanguineo(models.Model):
    grupo = models.CharField(max_length=5)
    factor = models.CharField(max_length=5)

    class Meta:
        unique_together = ('grupo', 'factor')

    def __str__(self):
        return f"{self.grupo} {self.factor}"




class Usuario(AbstractUser):
    email = models.EmailField(unique=True)  
    
    USERNAME_FIELD = 'email'               
    REQUIRED_FIELDS = ['username', 'nombre', 'apellido'] 

    dni = models.CharField(max_length=20, unique=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    fecha_registro = models.DateField(auto_now_add=True)

    rol = models.ForeignKey('Rol', on_delete=models.PROTECT, null=True)
    grupo_sanguineo = models.ForeignKey('GrupoSanguineo', on_delete=models.PROTECT, null=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"
    