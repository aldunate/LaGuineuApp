import { GlobalVar, UtilMsgs } from './../../util/global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http/src/backend';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import 'rxjs/add/operator/map';
import { ResponseType } from '@angular/http/src/enums';


export class Usuario {
  public Id: string;
  public Nombre: string;
  public Email: string;
  public Password: string;
  public FechaUltimaConexion: string;
  public EsGestor: boolean;
}


@Injectable()
export class UsuarioService {


  public id: string;
  public nombre: string;

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

  getUsuario(id, response) {
    const params = new HttpParams().set('id', id);
    this.http.get(GlobalVar.uriApi + 'usuario', { params: params })
      .subscribe((usuarios) => {
        response(usuarios);
      });
  }
  getUsuarioEscuela(response) {
    this.http.get(GlobalVar.uriApi + 'usuario')
      .subscribe((usuarios) => {
        response(usuarios);
      });
  }

  postUsuario(usuario, operacion, resp) {
    this.http.post(GlobalVar.uriApi + 'usuario', usuario)
      .subscribe((user) => {
        resp(UtilMsgs.cambiosGuardados, user);
      });

  }

}
