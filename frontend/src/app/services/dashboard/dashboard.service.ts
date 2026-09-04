import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardCampania {
    id: number;
    titulo: string;
    descripcion: string;
    ubicacion: string;
    fecha_inicio: string;
    fecha_fin: string;
    estado_campania: string;
    estado_calculado: string;
    estado: string;
}

export interface DashboardSerieMensual {
    anio: number;
    mes: number;
    cantidad: number;
}

export interface CampaniasPorEstado {
    estado: string;
    cantidad: number;
}

export interface Dashboard {
    total_campanias: number;
    total_inscripciones: number;
    total_donantes: number;
    campanias_recientes: DashboardCampania[];
    campanias_por_estado: CampaniasPorEstado[];
    inscripciones_por_mes: DashboardSerieMensual[];
    donantes_por_mes: DashboardSerieMensual[];
}

@Injectable({
    providedIn: 'root'
})

export class DashboardService {

    private http = inject(HttpClient);

    private apiUrl = 'http://127.0.0.1:8000/dashboard/';

    obtenerDashboard(): Observable<Dashboard> {
        return this.http.get<Dashboard>(this.apiUrl);
    }

}
