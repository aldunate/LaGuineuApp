import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { GlobalVar } from '../../util/global';
import { BackendInterceptor } from '../../util/service/backend.interceptor';

@Injectable()
export class ClienteService {

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

  getClientes(idEscuela, respuesta) {
    this.http.get(GlobalVar.uriApi + 'cliente', {
      params: new HttpParams().set('idEscuela', idEscuela.toString())
    })
      .subscribe((response) => {
        respuesta(response);
      });
  }

  postCliente(cliente, respuesta) {
    this.http.post(GlobalVar.uriApi + 'cliente', cliente )
      .subscribe((response) => {
        respuesta(response);
      });
  }
}
