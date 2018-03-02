import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { GlobalVar } from '../../util/global';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

export class Monitor {
  public Id: number;
  public Nombre: string;
  public Apellidos: string;
  public FechaNacimiento: any;
  public FotoPerfil: string;
  public FechaCrea: any;
  public FechaElim: any;
  public IdUsuario: number;
  public IdEscuela: number;

  public Titulos: any[];
  public FechasDisponibles: any[];
  public EstacionesDisponibles: any[];

  constructor() {
    this.Nombre = '';
    this.Apellidos = '';
    this.FechaNacimiento = '';
    this.FotoPerfil = '';
    this.FechasDisponibles = [];
    this.EstacionesDisponibles = [];
    this.Titulos = [];
  }
}

@Injectable()
export class MonitorService {

  private monitor = new BehaviorSubject<Monitor>(new Monitor());
  public monitor$ = this.monitor.asObservable();

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

  postMonitor(monitor, titulos, usuario, respuesta) {
    delete monitor.titulos;
    this.http.post(GlobalVar.uriApi + 'monitor', {
      Monitor: monitor,
      Titulos: titulos,
      Usuario: usuario
    })
      .subscribe((response) => {
        respuesta(response);
      });
  }

  getMonitor(idMonitor) {
    this.http.get(GlobalVar.uriApi + 'monitor', {
      params: new HttpParams().set('id', idMonitor)
    })
      .subscribe((monitor: Monitor) => {
        this.monitor.next(monitor);
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
  getMonitoresEscuela(respuesta) {
    this.http.get(GlobalVar.uriApi + 'monitor')
      .subscribe((response) => {
        respuesta(response);
      });
  }
}
