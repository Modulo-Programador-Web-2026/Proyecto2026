import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaniaService, Campania } from '../../../services/campania';

@Component({
  selector: 'app-campanias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campanias.html',
  styleUrl: './campanias.css'
})
export class Campanias implements OnInit {

  campanias: Campania[] = [];
  campaniasFiltradas: Campania[] = [];
  cargando: boolean = true;
  error: string = '';
  busqueda: string = '';
  filtroEstado: string = '';

  constructor(private campaniaService: CampaniaService) {}

  ngOnInit(): void {
    this.campaniaService.getCampanias().subscribe({
      next: (datos) => {
        this.campanias = datos;
        this.campaniasFiltradas = datos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las campañas.';
        this.cargando = false;
      }
    });
  }

  filtrar(): void {
    this.campaniasFiltradas = this.campanias.filter(c => {
      const coincideBusqueda = c.titulo.toLowerCase()
        .includes(this.busqueda.toLowerCase());
      return coincideBusqueda;
    });
  }
}