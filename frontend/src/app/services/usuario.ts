import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private apiUrl = 'http://127.0.0.1:8000/usuarios/';


  constructor(private http: HttpClient) {}


  getUsuarios() {

    return this.http.get<any[]>(this.apiUrl);

  }

}