import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario/usuario.service';

@Component({
  selector: 'app-usuario-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './usuario-modal.html',
  styleUrl: './usuario-modal.css'
})
export class UsuarioModal {

  @Input() usuario: any = null;
  @Input() modo: 'ver' | 'editar' | 'eliminar' = 'ver';
  @Output() cerrar = new EventEmitter<void>();
  @Output() actualizar = new EventEmitter<void>();

  editForm: FormGroup;
  cargando = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.editForm = this.fb.group({
      nombre:   ['', Validators.required],
      apellido: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      dni:      ['', Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.usuario && this.modo === 'editar') {
      this.editForm.patchValue({
        nombre:   this.usuario.nombre,
        apellido: this.usuario.apellido,
        email:    this.usuario.email,
        dni:      this.usuario.dni,
      });
    }
  }

  guardar(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    this.cargando = true;
    this.usuarioService.editarUsuario(this.usuario.id, this.editForm.value).subscribe({
      next: () => {
        this.cargando = false;
        this.actualizar.emit();
        this.cerrar.emit();
      },
      error: () => {
        this.cargando = false;
        this.error = 'Error al guardar los cambios.';
      }
    });
  }

  confirmarEliminar(): void {
    this.cargando = true;
    this.usuarioService.eliminarUsuario(this.usuario.id).subscribe({
      next: () => {
        this.cargando = false;
        this.actualizar.emit();
        this.cerrar.emit();
      },
      error: () => {
        this.cargando = false;
        this.error = 'Error al eliminar el usuario.';
      }
    });
  }
}