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

  public niveles = new BehaviorSubject<any[]>(null);
  public niveles$ = this.niveles.asObservable();

  public titulos = new BehaviorSubject<any[]>(null);
  public titulos$ = this.titulos.asObservable();

  public deportes = new BehaviorSubject<any[]>(null);
  public deportes$ = this.deportes.asObservable();

  public estaciones = new BehaviorSubject<any[]>(null);
  public estaciones$ = this.estaciones.asObservable();


  getNiveles() {
    this.http.get(GlobalVar.uriApi + 'nivel')
      .subscribe((response: any[]) => {
        this.niveles.next(response);
      });
  }

  getTitulos() {
    this.http.get(GlobalVar.uriApi + 'titulo')
      .subscribe((response: any[]) => {
        this.titulos.next(response);
      });
  }

  getEstaciones() {
    this.http.get(GlobalVar.uriApi + 'estacion')
      .subscribe((estaciones: any[]) => {
        this.estaciones.next(estaciones);
      });
  }

  getDeportes() {
    this.http.get(GlobalVar.uriApi + 'deporte')
      .subscribe((response: any[]) => {
        this.deportes.next(response);
      });
  }

}
