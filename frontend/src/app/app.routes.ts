import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Landing } from './pages/public/home/landing';
import { QuienesSomos } from './pages/public/quienes-somos/quienes-somos';
import { AdminDashboard } from './pages/admin/dashboard/dashboard';
import { AdminCampanias } from './pages/admin/campanias/campanias';
import { AdminInscripciones } from './pages/admin/inscripciones/inscripciones';
import { Login } from './pages/public/login/login';
import { Campanias } from './pages/public/campanias/campanias';
import { Usuarios } from './pages/admin/usuarios/usuarios';
import { Inscripciones } from './pages/public/inscripciones/inscripciones';
import { CampaniaDetalle } from './pages/public/campania-detalle/campania-detalle';
import { Registro } from './pages/public/registro/registro';
import { Informate } from './pages/public/informate/informate';
import { authGuard } from './guards/auth-guard';



export const routes: Routes = [

    // Rutas públicas
    {
        path: '',
        component: PublicLayout,
        children: [
            { path: '', component: Landing },
            { path: 'quienes-somos', component: QuienesSomos },
            { path: 'login', component: Login },
            { path: 'campanias', component: Campanias },
            { path: 'campanias/:id/inscripcion', component: Inscripciones },
            { path: 'campanias/:id', component: CampaniaDetalle },
            { path: 'usuarios', component: Usuarios },
            { path: 'registro', component: Registro },

            { path: 'informate', component: Informate }


        ]
    },

    // Rutas del administrador
        {
        path: 'admin',
        component: AdminLayout,
        canActivate: [authGuard],   
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboard },
            { path: 'campanias', component: AdminCampanias },
            { path: 'inscripciones', component: AdminInscripciones },
        ]
    },

    // Rutas del usuario estándar en un futuro

];