import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { GlobalVar } from '../../util/global';

@Injectable()
export class ClubService {

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

  getClubs(idEscuela, respuesta) {
    this.http.get(GlobalVar.uriApi + 'club', {
      params: new HttpParams().set('idEscuela', idEscuela.toString())
    })
      .subscribe((response) => {
        respuesta(response);
      });
  }

  postClub(club, clientes, respuesta) {
    this.http.post(GlobalVar.uriApi + 'club', {
      club: club,
      clientes: clientes
    } )
      .subscribe((response) => {
        respuesta(response);
      });
  }

  existeNombre(idEscuela, nombre, respuesta) {
    this.http.get(GlobalVar.uriApi + 'club', {
      params: new HttpParams().set('idEscuela', idEscuela.toString()).set('idEscuela', idEscuela.toString()),
    })
      .subscribe((response) => {
        respuesta(response);
      });
  }



}
