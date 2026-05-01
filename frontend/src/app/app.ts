import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {

  mensaje: string = '';
  version: string = '';

  constructor(private http: HttpClient) {}

  probarConexion() {
    console.log("click");

    this.http.get<any>('http://127.0.0.1:8000/test/')
      .subscribe(response => {
        console.log(response);

        this.mensaje = response.message;
        this.version = response.version;
      });
  }
}