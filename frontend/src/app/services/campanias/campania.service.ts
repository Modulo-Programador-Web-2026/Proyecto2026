import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Campania {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fecha_inicio: string;
  fecha_fin: string;
}

@Injectable({
  providedIn: 'root'
})

export class CampaniaService {

  private apiUrl = 'http://localhost:8000/campanias/campanias/';

  constructor(private http: HttpClient) {}

  getCampanias(): Observable<Campania[]> {
    return this.http.get<Campania[]>(this.apiUrl);
  }

  getCampania(id: string): Observable<Campania> {
    return this.http.get<Campania>(`${this.apiUrl}${id}/`);
  }

}