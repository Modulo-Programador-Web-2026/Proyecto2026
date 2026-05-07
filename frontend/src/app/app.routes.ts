import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Dashboard } from './pages/dashboard/dashboard';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';

export const routes: Routes = [
    { path: '', component: Landing },
    { path: 'dashboard', component: Dashboard },
    { path: 'quienes-somos', component: QuienesSomos }
];
