import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './campanias.html',
  styleUrls: ['./campanias.css']
})
export class AdminCampanias implements OnInit {

  campaniaForm: FormGroup;

  estados: any[] = [];

  mensaje = '';
  error = '';
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {

    this.campaniaForm = this.fb.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      estado_campania: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {

    this.http.get<any[]>(
      'http://localhost:8000/campanias/estados-campania/'
    ).subscribe({
      next: (data) => this.estados = data,
      error: () => this.error = 'No se pudieron cargar los estados'
    });

  }

  onSubmit() {

    this.mensaje = '';
    this.error = '';

    if (this.campaniaForm.invalid) {

      this.campaniaForm.markAllAsTouched();
      return;

    }

    const fechaInicio = new Date(
      this.campaniaForm.value.fecha_inicio
    );

    const fechaFin = new Date(
      this.campaniaForm.value.fecha_fin
    );

    if (fechaFin < fechaInicio) {

      this.error =
        'La fecha de finalización no puede ser anterior a la fecha de inicio';

      return;

    }

    this.cargando = true;

    this.http.post(
      'http://localhost:8000/campanias/campanias/',
      this.campaniaForm.value
    ).subscribe({

      next: () => {

        this.cargando = false;

        this.mensaje =
          'Campaña creada correctamente';

        this.campaniaForm.reset();

      },

      error: () => {

        this.cargando = false;

        this.error =
          'Error al crear la campaña';

      }

    });

  }

}