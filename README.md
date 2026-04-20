# Proyecto 2026

### Instrucciones de instalación
Para ejecutar este proyecto de forma local, es necesario instalar y configurar tanto el frontend (Angular) como el backend (Django).
#### 1. Requisitos previos
Asegúrese de tener instalado:
* Node.js y npm
* Python 3
* pip (gestor de paquetes de Python)
* Angular CLI
---
#### 2. Instalación del backend (Django)
1. Clonar el repositorio:
```
git clone <URL-del-repositorio>
cd backend
```
2. Crear un entorno virtual:
```
python -m venv venv
```
3. Activar el entorno virtual:
* En Windows:
```
venv\Scripts\activate
```
* En Linux/Mac:
```
source venv/bin/activate
```
4. Instalar dependencias:

```
pip install -r requirements.txt
```
5. Aplicar migraciones:
```
python manage.py migrate
```
6. Iniciar el servidor:
```
python manage.py runserver
```
---
#### 3. Instalación del frontend (Angular)
1. Ir a la carpeta del frontend:
```
cd frontend
```
2. Instalar dependencias:
```
npm install
```
3. Ejecutar la aplicación:
```
ng serve
```
4. Abrir en el navegador:
```
http://localhost:4200
```
---
### Uso básico
Una vez que el sistema está en ejecución, el usuario puede acceder a la aplicación desde su navegador en la dirección `http://localhost:4200`.
Al ingresar, se mostrará la pantalla principal, donde el usuario puede navegar por las diferentes secciones de la aplicación.
Las funcionalidades básicas incluyen:
* Visualizar la información disponible en la página principal.
* Navegar entre las distintas secciones mediante el menú.
* Crear, editar o eliminar datos (según las funciones implementadas).
El sistema se conecta con el backend desarrollado en Django para gestionar los datos en tiempo real.
Es importante mantener el servidor backend en ejecución para que la aplicación funcione correctamente.
---
