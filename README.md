# SangreYa

## Descripción del proyecto

SangreYa es una aplicación web SPA desarrollada con Angular y Django REST Framework orientada a la difusión y gestión de campañas de donación voluntaria de sangre.

La plataforma permite registrar usuarios, administrar campañas, gestionar inscripciones y visualizar estadísticas relacionadas con campañas y participación ciudadana. El sistema busca centralizar la información de campañas de donación y facilitar el acceso tanto para instituciones de salud como para la comunidad.

El proyecto fue desarrollado en el marco de la Tecnicatura Superior en Desarrollo Web y Aplicaciones Digitales del ISPC.

---

# Tecnologías utilizadas

## Frontend
- Angular
- TypeScript
- Bootstrap
- HTML5
- CSS3

## Backend
- Python
- Django
- Django REST Framework

## Base de datos
- MySQL

## Herramientas
- Git
- GitHub
- Angular CLI
- Node.js

---

# Integrantes del equipo

| Integrante | Rol |
|---|---|
| Astrid LUPPI | Product Owner / Desarrollo Frontend y Backend |
| Abigail PICONE| Scrum Master / Desarrollo Frontend y Backend |
| Mauricio PUCHETA| Desarrollo Frontend y Backend |
| Marcela VILLANUEVA | Desarrollo Backend y Frontend |
| Irina PIRLES| QA / Testing / Desarrollo Frontend y Backend |

---

# Funcionalidades implementadas

- Landing Page
- Sección Quiénes Somos
- Registro de usuarios (en proceso)
- Inicio de sesión
- CRUD de campañas
- CRUD de usuarios
- Dashboard administrativo
- Estadísticas administrativas
- Vista pública de campañas
- Formulario de inscripción a campañas
- API REST
- Formularios reactivos (en proceso)
- Persistencia en MySQL
- Fixtures con datos iniciales

---

# Arquitectura del sistema

El proyecto implementa una arquitectura cliente-servidor basada en API REST:

- Frontend desarrollado con Angular bajo arquitectura SPA (Single Page Application).
- Backend desarrollado con Django REST Framework.
- Comunicación mediante endpoints REST.
- Persistencia de datos mediante MySQL.

```text
Proyecto2026/
├── backend/
│   ├── ProyectoMain/
│   ├── campanias/
│   ├── dashboard/
│   ├── inscripciones/
│   ├── usuarios/
│   ├── manage.py
│   ├── docs/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layouts/
│   │   │   ├── pages/
│   │   │   │   ├── admin/
│   │   │   │   └── public/
│   │   │   ├── services/
│   │   │   └── app.routes.ts
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── README.md
│
├── README.md
└── .gitignore

```
---

# Requisitos previos

Asegurarse de tener instalado:

- Node.js
- npm
- Python 3
- pip
- Angular CLI
- MySQL


---

# Instalación del Backend (Django)

1. Clonar el repositorio

```bash
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
6. Cargar fixtures:
```
python manage.py loaddata fixtures.json
```
7. Iniciar el servidor:
```
python manage.py runserver
```
Backend disponible en:
```
http://localhost:8000
```
---
# Instalación del frontend (Angular)
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
Una vez ejecutados el frontend y backend:

- El usuario podrá navegar por la Landing Page.
- Visualizar campañas activas.
- Registrarse e iniciar sesión.
- Inscribirse a campañas.
- Acceder a funcionalidades según rol.
- Gestionar campañas y usuarios desde el dashboard administrativo.

---
# Estructura general del proyecto
/frontend
/backend
/docs

---
# Metodología de trabajo
El equipo utiliza metodología ágil Scrum.

Herramientas utilizadas:
- GitHub Projects
- GitHub Issues
- Kanban
- Discord
- WhatsApp
- Google Meet

---
# Wiki del proyecto
La documentación y organización del proyecto se encuentra disponible en la Wiki del repositorio.

Incluye:
- Requerimientos funcionales y no funcionales
- Historias de usuario
- Ceremonias Scrum
- Arquitectura del sistema
- DER y modelo relacional
- Instalación del proyecto

---
Este proyecto fue desarrollado para:
- Proyecto Integrador II
- Módulo Programador Web
- ISPC — Tecnicatura Superior en Desarrollo Web y Aplicaciones Digitales
