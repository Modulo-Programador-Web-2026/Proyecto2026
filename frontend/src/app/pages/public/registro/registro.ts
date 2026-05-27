import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro implements OnInit {

  registroForm: FormGroup;
  roles: any[] = [];
  grupos: any[] = [];
  mensaje = '';
  error = '';
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      rol: [2],
      grupo_sanguineo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/usuarios/rol/').subscribe({
      next: (data) => this.roles = data,
      error: () => this.error = 'No se pudieron cargar los roles'
    });

    this.http.get<any[]>('http://localhost:8000/usuarios/grupos-sanguineos/').subscribe({
      next: (data) => this.grupos = data,
      error: () => this.error = 'No se pudieron cargar los grupos sanguíneos'
    });
  }

  onSubmit() {
    this.mensaje = '';
    this.error = '';

    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    if (this.cargando) return;
    this.cargando = true;

    this.http.post('http://localhost:8000/usuarios/registro/', this.registroForm.value).subscribe({
      next: () => {
        this.cargando = false;
        this.mensaje = 'Usuario registrado correctamente';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.cargando = false;
        this.error = 'Error al registrar. Verificá los datos.';
      }
    });
  }
}