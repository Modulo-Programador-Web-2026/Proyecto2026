import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth';
import { HttpClient } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

    const authService = inject(AuthService);
    const token = localStorage.getItem('access_token');

    let reqConToken = req;

    if (token) {
        reqConToken = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }

    return next(reqConToken).pipe(
        catchError((error: HttpErrorResponse) => {

            if (error.status === 401) {
                const refreshToken = localStorage.getItem('refresh_token');

                if (!refreshToken) {
                    authService.logout();
                    return throwError(() => error);
                }

                const http = inject(HttpClient);

                return http.post<any>('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken }).pipe(
                    switchMap((response) => {
                        localStorage.setItem('access_token', response.access);
                        if (response.refresh) {
                            localStorage.setItem('refresh_token', response.refresh);
                        }
                        const retryReq = reqConToken.clone({
                            setHeaders: { Authorization: `Bearer ${response.access}` }
                        });
                        return next(retryReq);
                    }),
                    catchError((refreshError) => {
                        authService.logout();
                        return throwError(() => refreshError);
                    })
                );
            }

            return throwError(() => error);
        })
    );
};