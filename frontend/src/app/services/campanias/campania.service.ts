import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Campania {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CampaniaService {

  private apiUrl = 'http://localhost:8000/campanias/campanias/';

  constructor(private http: HttpClient) { }

  getCampanias(): Observable<Campania[]> {
    return this.http.get<Campania[]>(this.apiUrl).pipe(
      map(campanias => campanias.map(c => ({
        ...c,
        estado: this.calcularEstado(c.fecha_inicio, c.fecha_fin)
      })))
    );
  }

  getCampania(id: string): Observable<Campania> {
    return this.http.get<Campania>(`${this.apiUrl}${id}/`).pipe(
      map(c => ({
        ...c,
        estado: this.calcularEstado(c.fecha_inicio, c.fecha_fin),
        fecha_inicio_formateada: this.formatearFecha(c.fecha_inicio),
        fecha_fin_formateada: this.formatearFecha(c.fecha_fin)
      }))
    );
  }

  private calcularEstado(fechaInicio: string, fechaFin: string): string {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const [yi, mi, di] = fechaInicio.split('-').map(Number);
    const [yf, mf, df] = fechaFin.split('-').map(Number);
    const inicio = new Date(yi, mi - 1, di);
    const fin = new Date(yf, mf - 1, df);
    if (hoy < inicio) return 'Proxima';
    if (hoy > fin) return 'Finalizada';
    return 'En Curso';
  }

  private formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-AR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }
}