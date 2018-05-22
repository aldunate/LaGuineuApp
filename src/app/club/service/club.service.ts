import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { GlobalVar } from '../../util/global';
import { Cliente } from '../../cliente/service/cliente.service';

export class Club {
  public Nombre: string;
  public IdNivel?: number;
  public nivel?: string;
}

export class ClubModel {
  public Club: Club;
  public Clientes: Array<Cliente>;
  public Operacion: string;
}


@Injectable()
export class ClubService {

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

  getClubesEscuela(respuesta) {
    this.http.get(GlobalVar.uriApi + 'club')
      .subscribe((response) => {
        respuesta(response);
      });
  }

  postClub(club, respuesta) {
    this.http.post(GlobalVar.uriApi + 'club', club)
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
