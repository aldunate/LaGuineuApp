
import { Injectable } from '@angular/core';
import * as Cookies from 'es-cookie';
import { Output } from '@angular/core/src/metadata/directives';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TokenService {
    onLoguin: Subject<boolean> = new Subject<boolean>();
    public logueado: boolean;
    public token: string;
    public exp: Date;
    public crea: Date;
    constructor() {
        this.leer();
    }
    onLogueado(logueado: boolean) {
        this.logueado = logueado;
        this.onLoguin.next(logueado);
    }
    leer() {
        this.expiro();
        this.token = Cookies.get('joindernote');
        if (this.token !== undefined) {
            this.onLogueado(true);
            localStorage.setItem('token', this.token);
        } else {
            this.remove();
        }
    }
    expiro() {
        if (this.exp <= new Date()) {
            this.remove();
        }
    }
    remove() {
        Cookies.remove('joindernote');
        localStorage.removeItem('token');
        this.token = undefined;
        this.exp = undefined;
        this.crea = undefined;
        this.onLogueado(false);
    }
    create(token: any) {
        this.rellena(token);
        Cookies.set('joindernote', this.token, { expires: 1, path: '' });
        localStorage.setItem('token', this.token);
        this.onLogueado(true);

    }
    rellena(token: any) {
        this.token = token.Nombre;
        this.exp = new Date(token.FechaExp);
        this.crea = new Date(token.FechaCrea);
    }
}
