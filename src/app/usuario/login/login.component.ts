import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { TokenService } from '../service/token.service';
import { NavBarComponent } from '../../main/nav-bar/nav-bar.component';
import { AppComponent } from '../../app.component';


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

  constructor(private http: HttpClient, private usuarioService: UsuarioService,
    private router: Router, private tokenService: TokenService, private appComp: AppComponent) { }
  ngOnInit() { }

  login() {
    this.usuarioService.login(this.nombre, this.password, this.loginRespuesta.bind(this));
  }

  loginRespuesta(token: any) {
    this.tokenService.create(token);
    this.password = '';
    this.router.navigate(['/']);
  }

}
