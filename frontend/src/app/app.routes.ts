import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Landing } from './pages/public/home/landing';
import { QuienesSomos } from './pages/public/quienes-somos/quienes-somos';
import { AdminDashboard } from './pages/admin/dashboard/dashboard';
import { AdminCampanias } from './pages/admin/campanias/campanias';
import { AdminInscripciones } from './pages/admin/inscripciones/inscripciones';

export const routes: Routes = [

    // Rutas públicas
    {
        path: '',
        component: PublicLayout,
        children: [
            { path: '', component: Landing },
            { path: 'quienes-somos', component: QuienesSomos }
        ]
    },

    // Rutas del administrador
    {
        path: 'admin',
        component: AdminLayout,
        children: [
            { path: 'dashboard', component: AdminDashboard },
            { path: 'campanias', component: AdminCampanias },
            { path: 'inscripciones', component: AdminInscripciones }
        ]
    }

    // Rutas del usuario estándar en un futuro

];