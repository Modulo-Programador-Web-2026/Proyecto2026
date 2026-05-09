
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { UsuarioService } from '../../../services/usuario';


@Component({
  selector: 'app-usuarios',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './usuarios.html',

  styleUrl: './usuarios.css'
})

export class Usuarios implements OnInit {

    usuarios: any[] = [];


  constructor(
    private usuarioService: UsuarioService
  ) {}


  ngOnInit(): void {

    this.usuarioService
      .getUsuarios()
      .subscribe((data) => {

        this.usuarios = data;

        console.log(data);

      });

  }

}

