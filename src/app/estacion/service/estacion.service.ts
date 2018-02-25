import { Injectable } from '@angular/core';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { HttpClient } from '@angular/common/http';
import { GlobalVar } from '../../util/global';

@Injectable()
export class EstacionService {

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }


  getEstaciones(respuesta) {
    this.http.get(GlobalVar.uriApi + 'estacion')
      .subscribe((response) => respuesta(response));
  }

}
