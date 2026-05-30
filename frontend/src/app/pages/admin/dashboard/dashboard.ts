import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})

export class AdminDashboard implements OnInit {

  private dashboardService = inject(DashboardService);
  private router = inject(Router);

  dashboardData$ = this.dashboardService.obtenerDashboard().pipe(
    map(data => {
      const campanias_por_tipo = this.agruparCampanias(data.campanias_recientes);
      return {
        ...data,
        campanias_por_tipo,
        conicGradient: this.generarConicGradient(campanias_por_tipo),
        meses: this.transformarInscripcionesPorMes(data.inscripciones_por_mes)
      };
    }),
    shareReplay(1)
  );

  modalAbierto: string | null = null;

  ngOnInit(): void {
    // Nada
  }

  private agruparCampanias(campanias: any[]) {
    const grupos: { [key: string]: number } = {};

    campanias.forEach(c => {
      grupos[c.titulo] = (grupos[c.titulo] || 0) + 1;
    });

    const items = Object.entries(grupos).map(([titulo, count]) => ({
      titulo,
      count,
      porcentaje: Math.round((count / campanias.length) * 100)
    }));

    return items.map((item, index) => ({
      ...item,
      color: this.generarColor(index, items.length)
    }));

  }

  private transformarInscripcionesPorMes(inscripciones_por_mes: any[]) {

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];

    const mapa: { [key: number]: number } = {};
    inscripciones_por_mes.forEach(item => {
      mapa[item.mes] = item.cantidad;
    });

    return meses.map((mes, index) => ({
      mes,
      inscripciones: mapa[index + 1] || 0
    }));

  }

  private generarColor(index: number, total: number): string {
    const colores = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#52B788'
    ];
    return colores[index % colores.length];
  }

  private generarConicGradient(campanias_por_tipo: any[]): string {

    let gradiente = 'conic-gradient(';
    let posicion = 0;

    campanias_por_tipo.forEach((item, index) => {
      const inicio = posicion;
      const fin = posicion + item.porcentaje;
      gradiente += `${item.color} ${inicio}% ${fin}%`;
      if (index < campanias_por_tipo.length - 1) {
        gradiente += ', ';
      }
      posicion = fin;
    });

    gradiente += ')';
    return gradiente;

  }

  abrirModal(tipo: string): void {
    this.modalAbierto = tipo;
  }

  cerrarModal(): void {
    this.modalAbierto = null;
  }

  crearCampania(): void {

    this.router.navigate(
      ['/admin/campanias/nueva']
    );

  }

}