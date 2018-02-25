import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EscuelaService } from '../service/escuela.service';
import { Output } from '@angular/core/src/metadata/directives';
import { UsuarioService } from '../../usuario/service/usuario.service';

@Component({
  selector: 'app-nueva-escuela',
  templateUrl: './nueva-escuela.component.html',
  styleUrls: ['./nueva-escuela.component.css']
})
export class NuevaEscuelaComponent implements OnInit {

  Escuela = {
    Id: 0,
    Nombre: '',
    Direccion: '',
    Telefono: '',
    Email: ''
  };
  Usuario = {
    Nombre: '',
    Password: ''
  };
  password2 = '';
  formClass = 'form-control';
  errorMensaje = {
    general: '',
    usuario: '',
    password: ''
  };

  constructor(private http: HttpClient, private escuelaService: EscuelaService,
    private router: Router) { }

  ngOnInit() { }


  respUsuarioExiste(response: object) {
    // El usuario existe
    if (response !== null) {
      this.errorMensaje.usuario = 'El usuario ya existe';
    } else {
      this.errorMensaje.usuario = '';
    }
  }

  passwordChange(event: Object) {
    if (this.Usuario.Password !== '' && this.password2 !== '') {
      if (this.Usuario.Password === this.password2) {
        this.formClass = 'form-control  ng-valid';
        this.errorMensaje.password = '';
      } else {
        if (this.password2.length > 0 && this.Usuario.Password.length > 0) {
          this.formClass = 'form-control  ng-invalid'; // No funciona
          this.errorMensaje.password = 'Las contraseñas no coinciden';
        }
      }
    }
  }

  crearEscuela() {
    this.escuelaService.crearEscuela(this.Escuela, this.Usuario, this.respCrearEscuela.bind(this));
  }

  respCrearEscuela(idEscuela) {
    this.router.navigate(['/escuela/' + idEscuela]);
  }


}
