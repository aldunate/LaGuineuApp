import { GlobalVar } from './../../util/global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http/src/backend';
import { BackendInterceptor } from '../../auth/service/backend.interceptor';
import 'rxjs/add/operator/map';
import { ResponseType } from '@angular/http/src/enums';


@Injectable()
export class UsuarioService {


  public id: string;
  public nombre: string;

  constructor() { }

}
