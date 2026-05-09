from django.contrib import admin

# Register your models here.

from .models import Usuario, Rol, GrupoSanguineo
admin.site.register(Usuario)
admin.site.register(Rol)
admin.site.register(GrupoSanguineo)
