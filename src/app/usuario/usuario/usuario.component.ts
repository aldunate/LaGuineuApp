import { Component, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from '../service/usuario.service';
import { Router } from '@angular/router';
import { UtilService } from '../../util/service/util.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  usuario = new Usuario;
  msgs: Message[] = [];
  idUsuario: number;
  password1: string;
  password2: string;
  tipoUsuaro = '';
  changePassword = true;
  txtButtonChangePass = 'Cambiar contraseña';

  usuarioForm: FormGroup;
  errores = {
    usuarioReq: false,
    emailReq: false,
    passNoCoincide: false,
    passIncorrecto: false
  };

  constructor(public usuarioService: UsuarioService, private messageService: MessageService,
    private router: Router, private fb: FormBuilder, private utilService: UtilService) {
    const aux = this.router.url.split('/');
    this.idUsuario = Number.parseInt(aux[aux.length - 1]);
    this.getUsuario();

    this.usuarioForm = this.fb.group({
      email: new FormControl('', [Validators.required && Validators.email]),
      esGestor: new FormControl('', []),
    });

  }
  get email() { return this.usuarioForm.get('email'); }
  get nombreUsuario() { return this.usuarioForm.get('nombreUsuario'); }


  getUsuario() {
    this.usuarioService.getUsuario(this.idUsuario,
      function (usuario) {
        this.usuario = usuario;
        if (usuario.IdMonitor !== undefined) {
          this.tipoUsuaro = 'Monitor';
        }
        if (usuario.IdCliente !== undefined) {
          this.tipoUsuaro = 'Cliente';
        }
        this.usuarioForm.controls['email'].setValue(usuario.Email);
        this.usuarioForm.controls['esGestor'].setValue(usuario.EsGestor ? true : false);
        this.utilService.setTextoSuperior({
          titulo: usuario.Nombre,
          href: 'usuario/' + usuario.Id
        });
        this.inicio();
      }.bind(this));
  }

  inicio() {
  }

  onChangePassword(event) {
    if (this.password1 === this.password2) {
      this.errores.passNoCoincide = false;
    } else {
      this.errores.passNoCoincide = true;
    }
  }

  editarUsuario() {
    if (this.usuarioForm.valid) {
      if (this.changePassword === true) {
        this.usuario.Password = this.password1;
      }
      const u = this.usuarioForm.value;
      this.usuario.EsGestor = u.esGestor;
      this.usuario.Email = u.email;

      this.usuarioService.postUsuario(this.usuario, 'Editar',
      function (confirmacion, token) {
        this.msgs.push(confirmacion);
        this.router.navigate(['/usuario/' + token.IdUsuario]);
      }.bind(this));
    }
  }


}
