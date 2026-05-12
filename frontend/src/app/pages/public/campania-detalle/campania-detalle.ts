import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaniaService } from '../../../services/campanias/campania.service';

@Component({
  selector: 'app-campania-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campania-detalle.html',
  styleUrl: './campania-detalle.css'
})
export class CampaniaDetalle implements OnInit {

  campania: any = null;
  cargando: boolean = true;
  error: string = '';

  constructor(
    private campaniaService: CampaniaService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');

  const obs = this.campaniaService.getCampania(id!);
  
  obs.subscribe({
    next: (data: any) => {
      this.campania = data;
      this.cargando = false;
      this.cdr.detectChanges();

    },
    error: (err: any) => {
      this.error = 'No se pudo cargar la campaña.';
      this.cargando = false;
      this.cdr.detectChanges();
    }
  });
}

  getEstado(): string {
    if (!this.campania) return '';
    const hoy = new Date();
    const inicio = new Date(this.campania.fecha_inicio);
    const fin    = new Date(this.campania.fecha_fin);
    if (hoy < inicio) return 'Próximamente';
    if (hoy > fin)    return 'Finalizada';
    return 'En Curso';
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-AR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  irAInscripcion(): void {
    this.router.navigate(['/campanias', this.campania.id, 'inscripcion']);
  }

  volver(): void {
    this.router.navigate(['/campanias']);
  }
}