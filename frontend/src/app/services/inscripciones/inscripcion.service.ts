
import { Injectable } from '@angular/core';

import {HttpClient,HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class InscripcionService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getCampania(id: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/campanias/campanias/${id}/`
    );
  }

  getTotalInscriptos(campaniaId: number): Observable<{ totalInscriptos: number }> {
  return this.http.get<{ totalInscriptos: number }>(
    `${this.apiUrl}/inscripciones/inscripciones/total/?campania=${campaniaId}`
  );
}


  inscribirse(datos: any): Observable<{ data: any, totalInscriptos: number }> { 
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`
    });

 return this.http.post<{ data: any, totalInscriptos: number }>( 
      `${this.apiUrl}/inscripciones/inscripciones/`,
      datos,
      { headers }
    );
  }
}



