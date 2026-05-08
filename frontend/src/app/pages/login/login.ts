import { Component } from '@angular/core';

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
    private http: HttpClient
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
          Validators.maxLength(20)
        ]
      ]

    });

  }

  onSubmit() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }

    console.log(this.loginForm.value);

    this.http.post(

      'http://127.0.0.1:8000/login/',

      this.loginForm.value

    ).subscribe({

      next: (response) => {

        console.log(response);

        this.mensaje = 'Login correcto';

      },

      error: (error) => {

        console.log(error);

        this.mensaje = 'Credenciales incorrectas';

      }

    });

  }

}