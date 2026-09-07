import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const CENTRO_SALUD_MAX_LENGTH = {
  nombre: 100,
  direccion: 200,
  barrio: 50,
  localidad: 50,
  telefono: 10,
  sitio_web: 200
} as const;

export interface CentroSalud {
  id: number;
  nombre: string;
  direccion: string;
  barrio: string;
  localidad: string;
  telefono: string | null;
  sitio_web: string | null;
  latitud: string;
  longitud: string;
}

export interface Campania {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  centro_salud: number | null;
  centro_salud_detalle: CentroSalud | null;
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

  getCentrosSalud(): Observable<CentroSalud[]> {
    return this.http.get<CentroSalud[]>(
      'http://localhost:8000/centros-salud/centros/'
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
