import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { GlobalVar, UtilFile, UtilMsgs } from '../../util/global';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { RequestOptions, ResponseContentType } from '@angular/http';

export class Monitor {
  public Id: number;
  public Nombre: string;
  public Apellidos: string;
  public FechaNacimiento: any;
  public FotoPerfil: string;
  public Telefono: string;
}

export class MonitorModel {
  public Monitor: Monitor;
  public Usuario: any;
  public Titulos: any[];
  public FechasDisponibles: any[];
  public EstacionesDisponibles: any[];
  public Operacion: string;

  constructor() {
  }
}


@Injectable()
export class MonitorService {

  public monitor = new BehaviorSubject<MonitorModel>(null);
  public monitor$ = this.monitor.asObservable();

  private imgPerfil = new Subject<any>();
  public imgPerfil$ = this.imgPerfil.asObservable();

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

  postImgPerfil(idMonitor, fileImgPerfil) {
    const file = fileImgPerfil.srcElement.files[0];
    const data = {
      fotoPerfil: file.name,
      idMonitor: idMonitor
    };
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    formData.append('data', JSON.stringify(data));

    this.http
      .post(GlobalVar.uriApi + 'monitorPerfil', formData).subscribe(response => {
        const r = response;
      });
  }
  getImgPerfil(strFileUrl) {
    return this.http.get(GlobalVar.uriApi + 'monitorPerfil', {
      responseType: 'blob', params: new HttpParams().set('strFileUrl', strFileUrl)
    }).subscribe(respose => {
      this.imgPerfil.next(UtilFile.imageFromBlob(respose));
    });
  }

  getMonitor(idMonitor) {
    this.http.get(GlobalVar.uriApi + 'monitor', {
      params: new HttpParams().set('id', idMonitor)
    })
      .subscribe((monitor: MonitorModel) => {
        this.monitor.next(monitor);
      });
  }


  postMonitor(monitor: MonitorModel, operacion, resp) {
    monitor.Operacion = operacion;
    this.http.post(GlobalVar.uriApi + 'monitor', monitor)
      .subscribe((response: MonitorModel) => {
        this.monitor.next(response);
        resp(UtilMsgs.cambiosGuardados, response);
      });

  }

  getMonitoresEscuela(respuesta) {
    this.http.get(GlobalVar.uriApi + 'monitor')
      .subscribe((response) => {
        respuesta(response);
      });
  }
}
