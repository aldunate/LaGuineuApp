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
  private titulos = new Subject<any[]>();
  public titulos$ = this.titulos.asObservable();
  private deportes = new Subject<any[]>();
  public deportes$ = this.deportes.asObservable();
  private estaciones = new Subject<any[]>();
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


/*

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalVar } from '../global';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UtilService {

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

  private niveles$ = new Subject<any[]>();
  public niveles = [];

  private _titulos = new Subject<any[]>();
  public titulos$ = this._titulos.asObservable();
  public titulos = [];

  private _deportes = new Subject<any[]>();
  public deportes$ = this._deportes.asObservable();
  public deportes = [];

  private _estaciones = new Subject<any[]>();
  public estaciones$ = this._estaciones.asObservable();
  private estaciones = new Subject<any[]>();

  iniNiveles() {
    this.http.get(GlobalVar.uriApi + 'nivel')
      .subscribe((niveles: any[]) => {
        if (this.niveles$.observers.length > 0) {
          this.niveles$.next(niveles);
        }
        this.niveles = niveles;
      });
  }
  getNiveles() {
    if (this.niveles.length === 0) {
      this.iniNiveles();
      return this.niveles$.asObservable();
    } else {
      return this.niveles$.;
    }
  }


  getTitulos() {
    this.http.get(GlobalVar.uriApi + 'titulo')
      .subscribe((response: any[]) => {
        this._deportes.next(response);
      });
  }

  getEstaciones() {
    this.http.get(GlobalVar.uriApi + 'estacion')
      .subscribe((estaciones: any[]) => {
        this._estaciones.next(estaciones);
      });
  }

  getDeportes() {
    this.http.get(GlobalVar.uriApi + 'deporte')
      .subscribe((response: any[]) => {
        this._deportes.next(response);
      });
  }

}



*/
