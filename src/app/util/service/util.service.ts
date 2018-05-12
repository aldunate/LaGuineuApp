import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalVar } from '../global';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';




@Injectable()
export class UtilService {

  public edades = [
    { Id: 1, Nombre: 'Ns/Nc' },
    { Id: 2, Nombre: '-3' },
    { Id: 3, Nombre: '4 a 8' },
    { Id: 4, Nombre: '9 a 13' },
    { Id: 5, Nombre: '14 a 18' },
    { Id: 6, Nombre: '+18' }
  ];

  public niveles = new BehaviorSubject<any[]>(null);
  public niveles$ = this.niveles.asObservable();

  public titulos = new BehaviorSubject<any[]>(null);
  public titulos$ = this.titulos.asObservable();

  public deportes = new BehaviorSubject<any[]>(null);
  public deportes$ = this.deportes.asObservable();

  public estaciones = new BehaviorSubject<any[]>(null);
  public estaciones$ = this.estaciones.asObservable();

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

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

  getEstacionesEscuela(respuesta) {
    this.http.get(GlobalVar.uriApi + 'estacion', {
      params: new HttpParams().set('cualquiera', '0')
    })
      .subscribe((estaciones: any[]) => {
        estaciones.forEach(estacion => {
          this.estaciones.getValue().forEach(e => {
            if (estacion.IdEstacion === e.Id) {
              estacion.Nombre = e.Name;
              return;
            }
          });
        });
        respuesta(estaciones);
      });
  }

  getDeportes() {
    this.http.get(GlobalVar.uriApi + 'deporte')
      .subscribe((response: any[]) => {
        this.deportes.next(response);
      });
  }

}
