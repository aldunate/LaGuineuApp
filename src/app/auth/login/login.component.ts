import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../../auth/service/token.service';
import { NavBarComponent } from '../../main/nav-bar/nav-bar.component';
import { AuthService } from '../service/auth.service';
import { GlobalVar } from '../../util/global';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuarioForm = this.fb.group({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
  });

  @Output() logueado = new EventEmitter<any>();
  error = false;
  constructor(private http: HttpClient, private authService: AuthService,
    private router: Router, private tokenService: TokenService, private fb: FormBuilder) {
  }

  ngOnInit() { }

  get usuario() { return this.usuarioForm.get('usuario'); }
  get password() { return this.usuarioForm.get('password'); }

  login() {
    Object.keys(this.usuarioForm.controls).forEach(field => { // {1}
      const control = this.usuarioForm.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
    if (this.usuarioForm.valid) {
      this.authService.login(this.usuarioForm.value.usuario, this.usuarioForm.value.password,
        function (token) {
          if (token !== null) {
            this.tokenService.create(token);
            this.logueado.emit(true);
          }
          this.error = true;
        }.bind(this));
    }
  }

}
