import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BackendInterceptor } from './backend.interceptor';
import { GlobalVar } from '../../util/global';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }


  login(email, password, respuesta) {
    this.http.post(GlobalVar.uriApi + 'login', {
      'Password': password,
      'Email': email
    })
      .subscribe((response) => respuesta(response));
  }

  registro(usuario, password, respuesta) {
    this.http.post(GlobalVar.uriApi + 'registro', {
      'password': password,
      'Nombre': usuario
    })
      .subscribe((response) => respuesta(response));
  }

  usuarioExiste(nombre, respuesta) {
    this.http.get(GlobalVar.uriApi + 'registro',
      { params: new HttpParams().set('nombre', nombre) }
    )
      .subscribe((response) => respuesta(response));
  }

}
