import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaniaService, Campania } from '../../../services/campanias/campania.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-campanias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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

  constructor(private campaniaService: CampaniaService, 
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');   
    this.campaniaService.getCampanias().subscribe({
      next: (datos: Campania[]) => {
        console.log('datos recibidos:', datos); 
        this.campanias = datos;
        this.filtrar();
        console.log('filtradas:', this.campaniasFiltradas);
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('error:', err); 
        this.error = 'No se pudieron cargar las campañas.';
        this.cargando = false;
      }
    });
  }

  filtrar(): void {
  this.campaniasFiltradas = this.campanias.filter(c => {
    const hoy    = new Date();
    hoy.setHours(0, 0, 0, 0);

    const [yi, mi, di] = c.fecha_inicio.split('-').map(Number);
    const [yf, mf, df] = c.fecha_fin.split('-').map(Number);
    const inicio = new Date(yi, mi - 1, di);
    const fin    = new Date(yf, mf - 1, df);

    let estado = '';
    if (hoy < inicio) estado = 'proxima';
    else if (hoy > fin) estado = 'finalizada';
    else estado = 'activa';

    const coincideBusqueda = c.titulo.toLowerCase()
      .includes(this.busqueda.toLowerCase());

    if (!this.filtroEstado) {
      return coincideBusqueda && estado !== 'finalizada';
    }
    return coincideBusqueda && estado === this.filtroEstado;
  });
  this.cdr.detectChanges();
}
}