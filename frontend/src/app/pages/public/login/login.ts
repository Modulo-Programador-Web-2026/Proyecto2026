import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './login.html',

  styleUrl: './login.css'
})

export class Login {

  loginForm: FormGroup;

  mensaje = '';

  constructor(

    private fb: FormBuilder,

    private http: HttpClient,

    private router: Router

  ) {

    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100)
        ]
      ]

    });

  }

  onSubmit() {

    this.mensaje = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }


    this.http.post(
      'http://127.0.0.1:8000/login/',
      this.loginForm.value
    ).subscribe({

    next: (response: any) => {
      
      console.log(response);
      
      const rol = response.user.rol;

      localStorage.setItem('token', 'true');
      localStorage.setItem('usuario_id', response.user.id);

      localStorage.setItem('rol', rol);

      if (rol === 'Administrador') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/']);
      }

    },

    error: (error) => {
      this.mensaje = 'Credenciales incorrectas';
      this.loginForm.get('password')?.reset();
      this.loginForm.markAsUntouched();
    }
      
      
    });

  }

}