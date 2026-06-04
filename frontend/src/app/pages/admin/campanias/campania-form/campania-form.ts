import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-campania-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './campania-form.html',
  styleUrls: ['./campania-form.css']
})
export class CampaniaForm implements OnInit {

  campaniaForm: FormGroup;
  estado_campania: any[] = [];
  modoEdicion = false;
  campaniaId: number | null = null;

  mensajesError: any = {
    titulo: {
      required: 'El título es obligatorio.',
      minlength: 'El título debe tener al menos 5 caracteres.',
      maxlength: 'El título no puede superar los 100 caracteres.'
    },
    descripcion: {
      required: 'La descripción es obligatoria.',
      minlength: 'La descripción debe tener al menos 20 caracteres.',
      maxlength: 'La descripción no puede superar los 1500 caracteres.'
    },
    ubicacion: {
      required: 'La ubicación es obligatoria.',
      minlength: 'La ubicación debe tener al menos 5 caracteres.',
      maxlength: 'La ubicación no puede superar los 100 caracteres.'
    },
    fecha_inicio: { required: 'La fecha de inicio es obligatoria.' },
    fecha_fin: { required: 'La fecha de finalización es obligatoria.' },
    estado_campania: { required: 'Debe seleccionar un estado.' }
  };

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.campaniaForm = this.fb.group({

      titulo: ['',
        [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]
      ],
      descripcion: ['',
        [Validators.required,
        Validators.minLength(20),
        Validators.maxLength(1500)]],
      ubicacion: ['',
        [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      estado_campania: [null, Validators.required]
    });
  }


  ngOnInit(): void {
    this.cargarEstados();
    this.campaniaId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.campaniaId) {
      this.modoEdicion = true;
      this.cargarCampania(this.campaniaId);
    }
  }


  cargarEstados() {
    this.http.get<any[]>('http://localhost:8000/campanias/estados-campania/')
      .subscribe({
        next: (data) => {
          this.estado_campania = data;
          this.cdr.detectChanges();
        },
      });
    }


  cargarCampania(id: number) {
    this.http.get<any>(`http://localhost:8000/campanias/campanias/${id}/`)
      .subscribe(data => {
        this.campaniaForm.patchValue(data);
      });
  }


  validarFechas(): boolean {
    const inicio = new Date(
      this.campaniaForm.value.fecha_inicio
    );

    const fin = new Date(
      this.campaniaForm.value.fecha_fin
    );

    return fin >= inicio;

  }


  obtenerError(campo: string): string {
    const control = this.campaniaForm.get(campo);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const primerError = Object.keys(control.errors)[0];

    return this.mensajesError[campo]?.[primerError] || '';
  }

  onSubmit() {
    this.campaniaForm.markAllAsTouched();
    if (this.campaniaForm.invalid) {
      return;
    }

    if (!this.validarFechas()) {
      Swal.fire({
        title: 'Fechas inválidas',
        text: 'La fecha de finalización no puede ser anterior a la fecha de inicio',
        icon: 'error'
      });
      return;
    }

    const data = this.campaniaForm.value;

    if (this.modoEdicion) {

      this.http.put(
        `http://localhost:8000/campanias/campanias/${this.campaniaId}/`,
        data
      ).subscribe(() => {
        Swal.fire({
          title: 'Campaña actualizada',
          text: 'La campaña ha sido actualizada correctamente',
          icon: 'success',
          confirmButtonColor: '#2bc055'
        });
        this.router.navigate(['/admin/campanias']);
      }, () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar la campaña.'
        });
      });

    } else {

      this.http.post(
        'http://localhost:8000/campanias/campanias/',
        data
      ).subscribe(() => {
        Swal.fire({
          title: 'Campaña creada',
          text: 'La campaña ha sido creada correctamente',
          icon: 'success',
          confirmButtonColor: '#2bc055'
        });
        this.router.navigate(['/admin/campanias']);
      }, () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear la campaña.'
        });
      });
    }
  }
}