import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { GlobalVar, UtilMsgs } from '../../util/global';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import { Usuario } from '../../usuario/service/usuario.service';


export class Cliente {
  public Id?: number;
  public Nombre?: string;
  public Apellidos?: string;
  public FechaNacimiento?: any;
  public Telefono?: string;
  public IdNivel?: number;
  public nivel?: string;
  public IdClub?: number;
  public club?: string;
  public IdDeporte?: number;
  public deporte?: string;
}
export class ClienteModel {
  public Cliente: Cliente;
  public Usuario: Usuario;
  public Operacion: string;

}


@Injectable()
export class ClienteService {

  constructor(private http: HttpClient, private backendInterceptor: BackendInterceptor) { }

  getClientesEscuela(respuesta) {
    this.http.get(GlobalVar.uriApi + 'cliente')
      .subscribe((response) => {
        respuesta(response);
      });
  }

  postCliente(cliente, respuesta) {
    this.http.post(GlobalVar.uriApi + 'cliente', cliente)
      .subscribe((response) => {
        respuesta(UtilMsgs.cambiosGuardados, response);
      });
  }

  getCliente(idCliente, respuesta) {
    this.http.get(GlobalVar.uriApi + 'cliente', {
      params: new HttpParams().set('id', idCliente)
    })
      .subscribe((response) => {
        respuesta(response);
      });
  }


}
