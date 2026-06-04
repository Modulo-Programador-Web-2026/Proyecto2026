import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  const rol = localStorage.getItem('rol');

  if (!token) {
    return router.createUrlTree(['/login']);
  };

  if (rol !== 'Administrador') {
    return router.createUrlTree(['/']);
  };

  return true;

};