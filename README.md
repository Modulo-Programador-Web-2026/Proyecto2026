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
## Descripción del Proyecto – Evidencia 1
En el marco de la *Evidencia 1*, surgieron dudas respecto de si se debía continuar con el proyecto AquaMóvil o bien iniciar un nuevo proyecto de acuerdo a lo establecido por la materia Proyecto Integrador.

Según lo consensuado con las materias del módulo Programación Web, se decidió no perder tiempo e iniciar la evidencia presentando un proyecto genérico, con el objetivo de posteriormente adaptarlo según lo que se defina en la materia (ya sea continuar con el proyecto existente o desarrollar uno nuevo).
Es por este motivo que, en esta instancia, se presenta la Evidencia 1 sin un enfoque específico, a la espera de dar inicio al proyecto definitivo una vez que se establezcan las reglas de trabajo correspondientes a la Evidencia 2.

Cabe destacar que el equipo ya ha propuesto una alternativa de proyecto a AquaMóvil, la cual fue presentada a la docente el día miércoles 15 de abril en la clase de Proyecto Integrador, siendo recibida de manera positiva.

De forma preliminar, esta nueva propuesta aborda la problemática de la dificultad para conseguir donantes de sangre de manera rápida y eficiente, especialmente en situaciones de urgencia médica donde el tiempo es un factor crítico. Actualmente, la búsqueda de donantes suele realizarse a través de redes sociales o contactos personales, lo que genera demoras, incertidumbre y baja efectividad.

Asimismo, muchas personas dispuestas a donar no cuentan con información clara ni acceso a solicitudes concretas, lo que limita su posibilidad de colaborar. Esta situación impacta directamente en pacientes y sus familias, quienes deben invertir tiempo y esfuerzo en la búsqueda de donantes en contextos de alta vulnerabilidad.
La problemática fue identificada a partir de la observación de casos reales y experiencias cercanas, evidenciando la necesidad de contar con una herramienta digital que permita optimizar y organizar este proceso.

A continuación, se detallan los requerimientos funcionales y no funcionales, los cuales han sido definidos de forma general para que puedan ser aplicables a cualquiera de las alternativas de proyecto.

## Requerimientos Funcionales
* RF1: El sistema deberá permitir el registro de usuarios.
* RF2: El sistema deberá permitir el inicio de sesión de usuarios registrados.
* RF3: El sistema deberá permitir la gestión de información (crear, visualizar, editar y eliminar datos).
* RF4: El sistema deberá permitir la asignación de roles de usuario.
* RF5: El sistema deberá mostrar información relevante al usuario según su rol.
## Requerimientos No Funcionales
* RNF1: El sistema deberá ser fácil de usar y contar con una interfaz intuitiva.
* RNF2: El sistema deberá garantizar la seguridad de los datos de los usuarios.
* RNF3: El sistema deberá ser accesible desde distintos dispositivos (computadoras, tablets y celulares).

