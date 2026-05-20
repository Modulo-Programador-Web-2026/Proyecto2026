
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

  inscribirse(datos: any): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Token ${token}`
    });

    return this.http.post(
      `${this.apiUrl}/inscripciones/inscripciones/`,
      datos,
      { headers }
    );
  }
}



