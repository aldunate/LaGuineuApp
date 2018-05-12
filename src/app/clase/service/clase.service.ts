import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { GlobalVar, UtilMsgs } from '../../util/global';
import { UtilService } from '../../util/service/util.service';


export class Clase {
  public Id?: number;
  public IdEstacion?: number;
  public IdEdades?: number;
  public Estacion?: string;
  public Fecha?: string;
  public HoraInicio?: string;
  public HoraFin?: string;
  public Duracion?: string;
  public IdNivel?: number;
  public Nivel?: string;
  public EsClub?: boolean;
  public Personas?: number;
  public Nombre?: string;
}


@Injectable()
export class ClaseService {

  private cargado;
  private clase = new BehaviorSubject<any>(null);
  public clase$ = this.clase.asObservable();

  private clases = new BehaviorSubject<any[]>(null);
  public clases$ = this.clases.asObservable();

  constructor(private http: HttpClient,
    private backendInterceptor: BackendInterceptor, private utilService: UtilService) { }

  getClase(id) {
    this.http.get(GlobalVar.uriApi + 'clase', {
      params: new HttpParams().set('id', id)
    })
      .subscribe((clase: any) => {
        this.clase.next(clase);
      });
  }

  getClasesSinAsignar(response) {
    this.http.get(GlobalVar.uriApi + 'clase', {
      params: new HttpParams().set('operacion', 'SinAsignar')
    })
      .subscribe((clases: any[]) => {
        response(clases);
      });
  }


  getClasesEscuela(response) {
    this.http.get(GlobalVar.uriApi + 'clase', {
      params: new HttpParams().set('operacion', 'Todas')
    })
      .subscribe((clases: any[]) => {
        this.utilService.niveles$.subscribe(niveles => {
          clases.forEach(clase => {
            clase.Nivel = '';
            niveles.forEach(nivel => {
              if (clase.IdNivel === nivel.Id) {
                clase.Nivel = nivel.Nombre;
                return;
              }
            });
            clase.btnIr = '<button  id="' + clase.Id + '" class="btn btn-primary"> Ver clase </button>';
          });
        });

        this.utilService.estaciones$.subscribe(estaciones => {
          clases.forEach(clase => {
            clase.Estacion = '';
            estaciones.forEach(estacion => {
              if (clase.IdEstacion === estacion.Id) {
                clase.Estacion = estacion.Name;
                return;
              }
            });
          });
        });
        response(clases);
      });
  }

  postClase(clase, resp) {
    this.http.post(GlobalVar.uriApi + 'clase', clase)
      .subscribe((idClase) => {
        resp(UtilMsgs.cambiosGuardados, idClase);
      });

  }

}
