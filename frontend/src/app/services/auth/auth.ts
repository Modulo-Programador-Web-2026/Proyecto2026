import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly TOKEN_KEY = 'access_token';

  isAuthenticated = signal<boolean>(this.checkToken());

  constructor(private router: Router) {}

  private checkToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  login(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isAuthenticated.set(true);
    this.router.navigate(['/admin/dashboard']);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('rol');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

}