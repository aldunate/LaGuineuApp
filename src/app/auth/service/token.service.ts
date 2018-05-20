
import { Injectable } from '@angular/core';
import * as Cookies from 'es-cookie';
import { Output } from '@angular/core/src/metadata/directives';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { GlobalVar } from '../../util/global';

@Injectable()
export class TokenService {

  public logueado = new BehaviorSubject<boolean>(false);
  public token: string;
  public exp: Date;
  public crea: Date;

  constructor(private httpClient: HttpClient) {
    this.leer();
  }

  onLogueado(logueado: boolean) {
    if (this.logueado.value !== logueado) {
      this.logueado.next(logueado);
    }
  }

  getToken() {
    this.httpClient.get(GlobalVar.uriApi + 'token').subscribe(
      (token: boolean) => {
        this.onLogueado(token);
      }
    );
  }

  leer() {
    this.expiro();
    this.token = Cookies.get('LaGuineu');
    if (this.token !== undefined) {
      localStorage.setItem('LaGuineu', this.token);
      return true;
    } else {
      this.remove();
      return false;
    }
  }

  expiro() {
    if (this.exp <= new Date()) {
      this.remove();
    }
  }

  remove() {
    Cookies.remove('LaGuineu');
    localStorage.removeItem('LaGuineu');
    this.token = undefined;
    this.exp = undefined;
    this.crea = undefined;
    this.onLogueado(false);
  }

  create(token: any) {
    this.rellena(token);
    Cookies.set('LaGuineu', this.token, { expires: 1, path: '' });
    localStorage.setItem('LaGuineu', this.token);
    this.onLogueado(true);
  }

  rellena(token: any) {
    this.token = token.Nombre;
    this.exp = new Date(token.FechaExp);
    this.crea = new Date(token.FechaCrea);
  }
}
