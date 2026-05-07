from django.contrib import admin
from django.urls import path, include
from .views import TestView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('test/', TestView.as_view(), name='test-endpoint'),
    path('usuarios/', include('usuarios.urls')),
]
