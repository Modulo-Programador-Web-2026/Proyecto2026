from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario, Rol, GrupoSanguineo

@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Datos adicionales', {'fields': ('dni', 'nombre', 'apellido', 'rol')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Datos adicionales', {'fields': ('email', 'dni', 'nombre', 'apellido', 'rol')}),
    )

admin.site.register(Rol)
admin.site.register(GrupoSanguineo)
