import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaniaService } from '../../../services/campanias/campania.service';
import { InscripcionService } from '../../../services/inscripciones/inscripcion.service';

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
  inscriptosCount = 0;

  constructor(
    private campaniaService: CampaniaService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private inscripcionService: InscripcionService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    const obs = this.campaniaService.getCampania(id!);

    obs.subscribe({
      next: (data: any) => {
        this.campania = data;
        this.cargando = false;

        this.inscripcionService.getTotalInscriptos(this.campania.id).subscribe({
          next: (respuesta) => {
            this.inscriptosCount = respuesta.totalInscriptos;
            this.cdr.detectChanges();
          }
        });
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
    const fin = new Date(this.campania.fecha_fin);
    if (hoy < inicio) return 'Proxima';
    if (hoy > fin) return 'Finalizada';
    return 'En Curso';
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-AR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  inscribirse() {
    const token = localStorage.getItem('token');
    const usuarioId = localStorage.getItem('usuario_id'); // ← guardar al hacer login

    if (!token || !usuarioId) {
      alert('Debés iniciar sesión para inscribirte.');
      this.router.navigate(['/login']);
      return;
    }

    const datos = {
      usuario: Number(usuarioId),
      campania: this.campania.id
    };

    this.inscripcionService.inscribirse(datos).subscribe({
      next: (respuesta) => {
        this.inscriptosCount = respuesta.totalInscriptos;
        alert('Inscripción correcta');
      },
      error: (err) => {
        console.log('Error:', err.error);
        alert('Error: ' + JSON.stringify(err.error));
      }
    });
  }



  volver(): void {
    this.router.navigate(['/campanias']);
  }
}