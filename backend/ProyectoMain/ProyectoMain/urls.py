from django.contrib import admin
from django.urls import path, include
from .views import TestView
from usuarios.views import login_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('test/', TestView.as_view(), name='test-endpoint'),
    path('usuarios/', include('usuarios.urls')),
    path('inscripciones/', include('inscripciones.urls')),
    path('campanias/', include('campanias.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('login/', login_view),
]
