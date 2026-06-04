import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { UsuarioModal } from './usuario-modal/usuario-modal';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [UsuarioModal, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {

  usuarios: any[] = [];
  textoBusqueda = '';
  usuarioSeleccionado: any = null;
  usuariosOriginales: any[] = [];
  modoModal: 'ver' | 'editar' | 'eliminar' = 'ver';
  mostrarModal = false;

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.usuariosOriginales = [...data];
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

  filtrarUsuarios(): void {

    const texto = this.textoBusqueda.toLowerCase().trim();

    if (!texto) {
      this.usuarios = [...this.usuariosOriginales];
      return;
    }

    this.usuarios = this.usuariosOriginales.filter(usuario =>
      usuario.nombre?.toLowerCase().includes(texto) ||
      usuario.apellido?.toLowerCase().includes(texto) ||
      usuario.email?.toLowerCase().includes(texto) ||
      usuario.dni?.toString().includes(texto)
    );
  }
}