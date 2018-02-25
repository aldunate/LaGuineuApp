import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalVar } from '../global';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';

@Injectable()
export class UtilService {

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

  getNiveles(respuesta) {
    this.http.get(GlobalVar.uriApi + 'nivel')
      .subscribe((response) => {
        respuesta(response);
      });
  }

  getTitulos(respuesta) {
    this.http.get(GlobalVar.uriApi + 'titulo')
      .subscribe((response) => {
        respuesta(response);
      });
  }

  getDeportesEscuela(idEscuela, respuesta) {
    this.http.get(GlobalVar.uriApi + 'deporte', {
      params: new HttpParams().set('idEscuela', idEscuela)
    })
      .subscribe((response) => {
        respuesta(response);
      });
  }

  getDeportes(respuesta) {
    this.http.get(GlobalVar.uriApi + 'deporte')
      .subscribe((response) => {
        respuesta(response);
      });
  }

}
