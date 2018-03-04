import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalVar } from '../global';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UtilService {

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

  private niveles = new Subject<any[]>();
  public niveles$ = this.niveles.asObservable();
  public _niveles = [];

  private titulos = new Subject<any[]>();
  public titulos$ = this.titulos.asObservable();
  public _titulos = [];

  private deportes = new Subject<any[]>();
  public deportes$ = this.deportes.asObservable();
  public _deportes = [];

  private estaciones = new Subject<any[]>();
  public estaciones$ = this.estaciones.asObservable();
  public _estaciones = [];


  getNiveles() {
    this.http.get(GlobalVar.uriApi + 'nivel')
      .subscribe((response: any[]) => {
        this._niveles = response;
        this.niveles.next(response);
      });
  }

  getTitulos() {
    this.http.get(GlobalVar.uriApi + 'titulo')
      .subscribe((response: any[]) => {
        this._titulos = response;
        this.titulos.next(response);
      });
  }

  getEstaciones() {
    this.http.get(GlobalVar.uriApi + 'estacion')
      .subscribe((estaciones: any[]) => {
        this._estaciones = estaciones;
        this.estaciones.next(estaciones);
      });
  }

  getDeportes() {
    this.http.get(GlobalVar.uriApi + 'deporte')
      .subscribe((response: any[]) => {
        this._deportes = response;
        this.deportes.next(response);
      });
  }

}
