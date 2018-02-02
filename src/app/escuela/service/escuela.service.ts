import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BackendInterceptor } from '../../util/service/backend.interceptor';
import { GlobalVar } from '../../util/global';

@Injectable()
export class EscuelaService {

  escuela: any;
  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

  getEscuela(idEscuela, respuesta) {
    this.http.get(GlobalVar.uriApi + 'escuela', {
      params: new HttpParams().set('id', idEscuela)
    })
      .subscribe((response) => {
        this.escuela = response;
        respuesta(response);
      });
  }

  crearEscuela(escuela, usuario, respuesta) {
    this.http.post(GlobalVar.uriApi + 'escuela', {
      escuela: escuela,
      usuario: usuario
    })
      .subscribe((response) => {
        respuesta(response);
      });
  }


}
