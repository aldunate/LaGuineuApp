import { GlobalVar } from './../../util/global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http/src/backend';
import { BackendInterceptor } from '../../util/service/backend.interceptor';
import 'rxjs/add/operator/map';
import { ResponseType } from '@angular/http/src/enums';


@Injectable()
export class UsuarioService {


  public id: string;
  public nombre: string;

  constructor(private http: HttpClient,
    , private backendInterceptor: BackendInterceptor) { }

  login(usuario, password, respuesta) {
    this.http.post( GlobalVar.uriApi + 'login', {
      'password': password,
      'Nombre': usuario
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
