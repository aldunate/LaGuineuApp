import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { UsuarioService, Usuario } from '../service/usuario.service';
import { UtilService } from '../../util/service/util.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrls: ['./usuario-nuevo.component.css']
})
export class UsuarioNuevoComponent implements OnInit {

  usuario = new Usuario;
  msgs: Message[] = [];

  constructor(private usuarioService: UsuarioService, private utilService: UtilService,
    private router: Router, private messageService: MessageService) {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    this.getUsuario();
  }

  ngOnInit() {
  }

  btnVolver() {
    this.router.navigate(['/usuarios']);
  }

  getUsuario() {
    const aux = this.router.url.split('/');
    const id = Number.parseInt(aux[aux.length - 1]);
    if (!isNaN(id)) {
      this.usuarioService.getUsuario(id,
        function (usuario: Usuario) {
          usuario.Password = '';
          this.usuario = usuario;
        }.bind(this));
    }
  }

  crearUsuario() {
    this.usuarioService.postUsuario(this.usuario, 'Crear',
      function (confirmacion, token) {
        this.msgs.push(confirmacion);
        this.router.navigate(['/usuario/' + token.IdUsuario]);
      }.bind(this));
  }

}
