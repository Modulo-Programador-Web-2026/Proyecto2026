import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { UsuarioModal } from './usuario-modal/usuario-modal';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [UsuarioModal],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {

  usuarios: any[] = [];
  usuarioSeleccionado: any = null;
  modoModal: 'ver' | 'editar' | 'eliminar' = 'ver';
  mostrarModal = false;

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('ERROR:', err)
    });
  }

  abrirModal(usuario: any, modo: 'ver' | 'editar' | 'eliminar'): void {
    this.usuarioSeleccionado = usuario;
    this.modoModal = modo;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.usuarioSeleccionado = null;
  }
}