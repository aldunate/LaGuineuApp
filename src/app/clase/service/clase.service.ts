import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { GlobalVar } from '../../util/global';


export class Clase {
  public Id: number;
  public IdEstacion: string;
  public Estacion: string;
  public FechaHora: string;
  public IdNivel: any;
  public Nivel: any;
  public EsClub: boolean;
}

export class ClaseModel {
  public Clase: Clase;
  public Aux: any;
  public Clientes: any;
  public Monitores: any[];
  constructor() { }
}

@Injectable()
export class ClaseService {

  private clase = new BehaviorSubject<ClaseModel>(null);
  public clase$ = this.clase.asObservable();

  private clases = new BehaviorSubject<ClaseModel[]>(null);
  public clases$ = this.clases.asObservable();

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

  getClase(id) {
    this.http.get(GlobalVar.uriApi + 'clase', {
      params: new HttpParams().set('id', id)
    })
      .subscribe((clase: ClaseModel) => {
        this.clase.next(clase);
      });
  }

  getClasesEscuela() {
    this.http.get(GlobalVar.uriApi + 'clase')
      .subscribe((clases: any[]) => {
        this.clases.next(clases);
      });
  }

  postClase(clase, respuesta) {
    this.http.post(GlobalVar.uriApi + 'clase', {
      Clase: clase
    })
      .subscribe((response) => {
        respuesta(response);
      });
  }


}
