import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { GlobalVar } from '../../util/global';

@Injectable()
export class MonitorService {
  monitor: any;
  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }
  crearMonitor(monitor, titulos, usuario, respuesta) {
    delete monitor.titulos;
    this.http.post(GlobalVar.uriApi + 'monitor', {
      Monitor: monitor,
      Titulos: titulos,
      Usuario: usuario
    })
      .subscribe((response) => {
        this.monitor = response;
        respuesta(response);
      });
  }

  getMonitor(idMonitor, respuesta) {
    this.http.get(GlobalVar.uriApi + 'monitor', {
      params: new HttpParams().set('id', idMonitor)
    })
      .subscribe((response) => {
        this.monitor = response;
        respuesta(response);
      });
  }

  saveCalendario(monitor, respuesta) {
    this.http.post(GlobalVar.uriApi + 'monitorCalendario', {
      FechasDisponibles: monitor.FechasDisponibles,
      EstacionesDisponibles: monitor.EstacionesDisponibles,
      IdMonitor: monitor.Id
    })
      .subscribe((response) => {
        respuesta(response);
      });
  }
  getMonitoresEscuela(idEscuela, respuesta) {
    this.http.get(GlobalVar.uriApi + 'monitor', {
      params: new HttpParams().set('idEscuela', idEscuela)
    })
      .subscribe((response) => {
        respuesta(response);
      });
  }
}
