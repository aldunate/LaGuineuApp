import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { UsuarioService, Usuario } from '../service/usuario.service';
import { UtilService } from '../../util/service/util.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrls: ['./usuario-nuevo.component.css']
})
export class UsuarioNuevoComponent {

  usuario = new Usuario;
  msgs: Message[] = [];
  idUsuario: number;
  password1 = '';
  password2 = '';
  tipoUsuaro = '';
  changePassword = true;
  txtButtonChangePass = 'Cambiar contraseña';
  txtBtnGuardar = 'Crear usuario';
  isEditUser = false;
  usuarioForm: FormGroup;
  errores = {
    usuarioReq: false,
    emailReq: false,
    passNoCoincide: false,
    passIncorrecto: false,
    valid: false
  };
  puedeGestor = false;

  constructor(public usuarioService: UsuarioService, private messageService: MessageService,
    private router: Router, private fb: FormBuilder, private utilService: UtilService) {
    const aux = this.router.url.split('/');
    this.idUsuario = Number.parseInt(aux[aux.length - 1]);

    if (!isNaN(this.idUsuario)) {
      this.getUsuario();
      this.txtBtnGuardar = 'Modificar usuario';
      this.isEditUser = true;
      this.changePassword = true;
    } else {
      this.puedeGestor = true;
      this.isEditUser = false;
      this.txtBtnGuardar = 'Crear usuario';
      this.changePassword = false;
    }

    this.usuarioForm = this.fb.group({
      email: new FormControl('', [Validators.required && Validators.email]),
      esGestor: new FormControl(false, []),
    });

  }
  get email() { return this.usuarioForm.get('email'); }
  get nombreUsuario() { return this.usuarioForm.get('nombreUsuario'); }


  getUsuario() {
    this.usuarioService.getUsuario(this.idUsuario,
      function (usuario) {
        this.usuario = usuario;
        this.puedeGestor = true;
        if (usuario.IdMonitor !== undefined) {
          this.tipoUsuaro = 'Monitor';
          this.puedeGestor = false;
        }
        if (usuario.IdCliente !== undefined) {
          this.tipoUsuaro = 'Cliente';
          this.puedeGestor = false;
        }
        this.usuarioForm.controls['email'].setValue(usuario.Email);
        this.usuarioForm.controls['esGestor'].setValue(usuario.EsGestor ? true : false);
        this.utilService.setTextoSuperior({
          titulo: 'Usuario ' + usuario.Email,
          href: 'usuario/' + usuario.Id
        });
        this.inicio();
      }.bind(this));
  }

  inicio() {
  }

  onChangePassword() {
    this.errores.valid = true;
    if (this.password1 === this.password2) {
      this.errores.passNoCoincide = false;
    } else {
      this.errores.passNoCoincide = true;
      this.errores.valid = false;
    }

    if (this.password1.length >= 5) {
      this.errores.passIncorrecto = false;
    } else {
      this.errores.passIncorrecto = true;
      this.errores.valid = false;
    }
  }

  editarUsuario() {
    if (this.usuarioForm.valid && this.errores.valid) {
      if (this.changePassword === true) {
        this.usuario.Password = this.password1;
      }
      const u = this.usuarioForm.value;
      this.usuario.EsGestor = u.esGestor;
      this.usuario.Email = u.email;
      const operacion = this.isEditUser ? 'Editar' : 'Crear';
      this.usuarioService.postUsuario(this.usuario, operacion,
        function (confirmacion, token) {
          this.msgs.push(confirmacion);
          this.router.navigate(['/usuarios']);
        }.bind(this));
    } else {
      this.onChangePassword();
    }
  }


}
