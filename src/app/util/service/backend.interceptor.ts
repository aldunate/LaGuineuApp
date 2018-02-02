import { LoginComponent } from './../../usuario/login/login.component';
import { GlobalVar } from './../global';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { get } from 'es-cookie';
import { HttpClient } from '@angular/common/http/src/client';
import { HttpHeaders } from '@angular/common/http/src/headers';


@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (GlobalVar.mockBackend) {
      let aux: string[];
      aux = request.url.split('/');
      request = request.clone({
        url: '../../../assets/jsonApi/' + aux[aux.length - 1] + '.json',
        method: 'GET',
        body: ''
      });
    } else {

    }
    return next.handle(request);
  }
}
