import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../../auth/service/token.service';
import { NavBarComponent } from '../../main/nav-bar/nav-bar.component';
import { AppComponent } from '../../app.component';
import { AuthService } from '../service/auth.service';
import { GlobalVar } from '../../util/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensaje = 'Welcome';
  nombre = '';
  password = '';
  passwordClass = 'form-control';
  usuarioClass = 'form-control';
  usuarioMensaje = '';
  passwordMensaje = '';
  logueado: boolean;

  constructor(private http: HttpClient, private authService: AuthService,
    private router: Router, private tokenService: TokenService, private appComp: AppComponent) {
      this.logueado = this.tokenService.logueado;
  }
  ngOnInit() { }

  login() {
    this.authService.login(this.nombre, this.password, function (token) {
      this.tokenService.create(token);
      this.password = '';
      this.router.navigate(['/']);
    }.bind(this));
  }

}
