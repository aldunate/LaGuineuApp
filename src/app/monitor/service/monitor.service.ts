import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BackendInterceptor } from '../../util/service/backend.interceptor';
import { GlobalVar } from '../../util/global';

@Injectable()
export class MonitorService {

  monitor: any;

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

  getEstaciones(respuesta) {
    this.http.get(GlobalVar.uriApi + 'estaciones')
      .subscribe((response) => respuesta(response));
  }

  crearMonitor(monitor, respuesta) {
    this.http.post(GlobalVar.uriApi + 'monitor', {
      'monitor': monitor
    })
      .subscribe((response) => {
        this.monitor = response;
        respuesta(response);
      });
  }

  getMonitor(monitor, respuesta) {
    this.http.get(GlobalVar.uriApi + 'monitor', {
      params: new HttpParams().set('id', monitor.id)
    })
      .subscribe((response) => {
        this.monitor = response;
        respuesta(response);
      });
  }

  saveCalendario(pestCalendario, respuesta) {
    this.http.post('../../../assets/jsonApi/calendario', {
      'calendario': JSON.stringify(pestCalendario)
    })
      .subscribe((response) => {
        respuesta(response);
      });
  }


  getCalendario(monitor, respuesta) {
    this.http.get(GlobalVar.uriApi + 'monitorCalendario', {
      params: new HttpParams().set('id', monitor.id)
    })
      .subscribe((response) => {
        this.monitor.calendarioEvents = response;
        respuesta(response);
      });
  }

}
