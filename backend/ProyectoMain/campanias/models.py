from django.db import models


class Estado_Campania(models.Model):
    estado=models.CharField(max_length=50,unique=True)

def __str__(self):
    return self.estado





class Campania(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=1500)
    ubicacion = models.CharField(max_length=100)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    estado_campania = models.ForeignKey('Estado_Campania', on_delete=models.PROTECT, null=False)

def __str__(self):
        return self.titulo



    

    