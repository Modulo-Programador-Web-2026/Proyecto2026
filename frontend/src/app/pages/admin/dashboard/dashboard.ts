import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})

export class AdminDashboard {

  modalAbierto: string | null = null;

  abrirModal(tipo: string) {
    this.modalAbierto = tipo;
  }

  cerrarModal() {
    this.modalAbierto = null;
  }

}