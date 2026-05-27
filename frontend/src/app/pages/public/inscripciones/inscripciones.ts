import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InscripcionService } from '../../../services/inscripciones/inscripcion.service';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css'
})
export class Inscripciones implements OnInit {

  campania: any = null;
  cargando: boolean = false;
  enviando: boolean = false;
  error: string = '';
  exito: boolean = false;

  readonly grupos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  form = new FormGroup({
    nombre:   new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    dni:      new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    grupo:    new FormControl('', Validators.required),
  });

  constructor(
    private inscripcionService: InscripcionService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.obtenerCampania(id);
  }

  obtenerCampania(id: string | null): void {
    if (!id) return;
    this.cargando = true;
    this.inscripcionService.getCampania(id).subscribe({
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

  seleccionarGrupo(grupo: string): void {
  this.form.patchValue({ grupo });
  this.form.get('grupo')?.markAsTouched();
}

  confirmarInscripcion(): void {
  this.error = '';
  this.form.markAllAsTouched();
  
  if (this.form.invalid) {
    this.error = 'Por favor completá todos los campos.';
    return;
  }
  
    this.enviando = true;
    const datos = {
      ...this.form.value,
      campania_id: this.campania?.id
    };

    this.inscripcionService.inscribirse(datos).subscribe({
      next: () => {
        this.exito    = true;
        this.enviando = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error    = err.error?.error || 'Error al confirmar. Intente nuevamente.';
        this.enviando = false;
        this.cdr.detectChanges();
      }
    });
  }
}