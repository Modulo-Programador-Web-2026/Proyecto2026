import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Landing } from './pages/public/home/landing';
import { QuienesSomos } from './pages/public/quienes-somos/quienes-somos';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Login } from './pages/login/login';
import { Campanias } from './pages/public/campanias/campanias';


export const routes: Routes = [

    // Rutas públicas
    {
        path: '',
        component: PublicLayout,
        children: [
            { path: '', component: Landing },
            { path: 'quienes-somos', component: QuienesSomos },
            { path: 'login', component: Login },
            { path: 'campanias', component: Campanias }

        ]
    },

    // Rutas del administrador
    {
        path: 'admin',
        component: AdminLayout,
        children: [
            { path: 'dashboard', component: Dashboard }
        ]
    }

    // Rutas del usuario estándar en un futuro

];