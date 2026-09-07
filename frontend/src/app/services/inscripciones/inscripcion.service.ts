
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class InscripcionService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getCampania(id: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/campanias/${id}/`
    );
  }

  getTotalInscriptos(campaniaId: number): Observable<{ totalInscriptos: number }> {
  return this.http.get<{ totalInscriptos: number }>(
    `${this.apiUrl}/inscripciones/campanias/${campaniaId}/total/`
  );
}


  inscribirse(campaniaId: number): Observable<{ data: any, totalInscriptos: number }> {
    return this.http.post<{ data: any, totalInscriptos: number }>(
      `${this.apiUrl}/inscripciones/campanias/${campaniaId}/`,
      null
    );
  }
}



