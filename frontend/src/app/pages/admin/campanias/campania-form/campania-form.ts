import { Component, OnInit, inject } from '@angular/core';
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
  modoEdicion = false;
  campaniaId: number | null = null;
  estadoActual = '';
  mensajeErrorFechas = '';
  fechaInicioOriginal: string | null = null;
  readonly fechaMinima = this.formatearFechaParaInput(new Date());
  minFechaInicio = this.fechaMinima;

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
    fecha_fin: { required: 'La fecha de finalización es obligatoria.' }
  };

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

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
      estado_campania: [{ value: '', disabled: true }]
    });

    this.campaniaForm.valueChanges.subscribe(() => {
      this.actualizarEstado();
    });
  }


  ngOnInit(): void {
    this.campaniaId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.campaniaId) {
      this.modoEdicion = true;
      this.cargarCampania(this.campaniaId);
    } else {
      this.actualizarEstado();
    }
  }


  cargarCampania(id: number) {
    this.http.get<any>(`http://localhost:8000/campanias/campanias/${id}/`)
      .subscribe(data => {
        this.fechaInicioOriginal = data.fecha_inicio;
        this.minFechaInicio = data.fecha_inicio < this.fechaMinima
          ? data.fecha_inicio
          : this.fechaMinima;
        this.campaniaForm.patchValue(data);
        this.actualizarEstado();
      });
  }


  validarFechas(): string {
    const inicio = this.campaniaForm.value.fecha_inicio;
    const fin = this.campaniaForm.value.fecha_fin;

    if (!inicio || !fin) {
      return '';
    }

    if (
      (!this.modoEdicion && inicio < this.fechaMinima) ||
      (this.modoEdicion && inicio < this.fechaMinima && inicio !== this.fechaInicioOriginal)
    ) {
      return 'La fecha de inicio no puede ser anterior a hoy.';
    }

    if (fin < this.fechaMinima) {
      return 'No se puede crear o editar una campaña finalizada.';
    }

    if (fin < inicio) {
      return 'La fecha de fin no puede ser anterior a la fecha de inicio.';
    }

    return '';
  }


  private actualizarEstado(): void {
    const inicio = this.campaniaForm.value.fecha_inicio;
    const fin = this.campaniaForm.value.fecha_fin;

    this.mensajeErrorFechas = this.validarFechas();

    if (!inicio || !fin) {
      this.estadoActual = '';
      this.campaniaForm.get('estado_campania')?.setValue('', { emitEvent: false });
      return;
    }

    if (fin < this.fechaMinima) {
      this.estadoActual = 'Finalizada';
    } else if (inicio > this.fechaMinima) {
      this.estadoActual = 'Proximamente';
    } else {
      this.estadoActual = 'Activa';
    }

    this.campaniaForm.get('estado_campania')?.setValue(
      this.estadoActual,
      { emitEvent: false }
    );
  }


  private formatearFechaParaInput(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
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

    const errorFechas = this.validarFechas();
    if (errorFechas) {
      Swal.fire({
        title: 'Fechas inválidas',
        text: errorFechas,
        icon: 'error'
      });
      return;
    }

    const data = {
      ...this.campaniaForm.value,
      estado_campania: this.estadoActual
    };

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
