import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InscripcionService } from '../../../services/inscripciones/inscripcion.service';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css'
})
export class Inscripciones implements OnInit {

  campania: any = null;
  cargando: boolean = false;
  enviando: boolean = false;
  error: string = '';
  exito: boolean = false;

  nombre: string = '';
  apellido: string = '';
  dni: string = '';
  grupoSeleccionado: string = '';

  readonly grupos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  constructor(
    private inscripcionService: InscripcionService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');   // ← toma el id de la URL
    this.obtenerCampania(id);
  }

  obtenerCampania(id: string | null): void {
    if (!id) return;
    this.cargando = true;
    this.inscripcionService.getCampania(id).subscribe({  
      next: (data) => {
        this.campania = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudo cargar la campaña.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  seleccionarGrupo(grupo: string): void {
    this.grupoSeleccionado = grupo;
  }

  confirmarInscripcion(): void {
    this.error = '';
    if (!this.nombre || !this.apellido || !this.dni || !this.grupoSeleccionado) {
      this.error = 'Por favor completá todos los campos.';
      return;
    }
    this.enviando = true;
    const datos = {
      nombre:      this.nombre,
      apellido:    this.apellido,
      dni:         this.dni,
      grupo:       this.grupoSeleccionado,
      campania_id: this.campania?.id
    };
    this.inscripcionService.crearInscripcion(datos).subscribe({
      next: () => {
        this.exito    = true;
        this.enviando = false;
      },
      error: (err) => {
        console.error(err);
        this.error    = err.error?.error || 'Error al confirmar. Intente nuevamente.';
        this.enviando = false;
      }
    });
  }
}