import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { GlobalVar, UtilFile } from '../../util/global';
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
    /*this.Monitor = {
      Id: 0,
      Nombre: '',
      Apellidos: '',
      FechaNacimiento: '',
      FotoPerfil: '',
      Telefono: ''
    };
    this.Usuario = {
      Email: '',
      Nombre: ''
    };
    this.FechasDisponibles = [];
    this.EstacionesDisponibles = [];
    this.Titulos = [];*/
  }
}


@Injectable()
export class MonitorService {

  private monitor = new BehaviorSubject<MonitorModel>(new MonitorModel());
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

  postMonitor(monitor, respuesta) {
    this.http.post(GlobalVar.uriApi + 'monitor', {
      Monitor: monitor.Monitor,
      Titulos: monitor.Titulos,
      Usuario: monitor.Usuario
    })
      .subscribe((response) => {
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
  getMonitoresEscuela(respuesta) {
    this.http.get(GlobalVar.uriApi + 'monitor')
      .subscribe((response) => {
        respuesta(response);
      });
  }
}
