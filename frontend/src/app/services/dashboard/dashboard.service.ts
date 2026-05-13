import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Campania {
    id: number;
    titulo: string;
    descripcion: string;
    ubicacion: string;
    fecha_inicio: string;
    fecha_fin: string;
    estado_campania: number;
}

interface InscripcionPorMes {
    mes: number;
    cantidad: number;
}

interface Dashboard {
    total_campanias: number;
    total_inscripciones: number;
    total_donantes: number;
    campanias_recientes: Campania[];
    inscripciones_por_mes: InscripcionPorMes[];
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