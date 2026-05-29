import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaniaService } from '../../../services/campanias/campania.service';
import { InscripcionService } from '../../../services/inscripciones/inscripcion.service';
import { AuthService } from '../../../services/auth/auth';
import Swal from 'sweetalert2';

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
    private authService: AuthService
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

    if (!this.authService.isAuthenticated()) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Debés iniciar sesión para continuar',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return;
    };

    this.inscripcionService.inscribirse({
      campania: this.campania.id
    }).subscribe({

      next: (respuesta) => {
        this.inscriptosCount = respuesta.totalInscriptos;
        Swal.fire({
          icon: 'success',
          title: 'Inscripción exitosa',
          text: 'Te has inscrito correctamente a la campaña',
          showConfirmButton: false,
          timer: 2000
        });
      },

      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al inscribirse a la campaña',
          showConfirmButton: false,
          timer: 2000
        });
      }

    });

  }

  volver(): void {
    this.router.navigate(['/campanias']);
  }

}