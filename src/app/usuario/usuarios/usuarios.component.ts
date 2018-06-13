import { Component, OnInit } from '@angular/core';
import { UtilDataTable } from '../../util/global';
import { UsuarioService } from '../service/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  tablas = {
    monitor: UtilDataTable.iniDataTable(
      [
        UtilDataTable.iniFiltro('Email')
      ],
      [
        { title: 'Email', data: 'Email', type: 'string' },
        { title: 'Tipo', data: 'tipo', type: 'string' },
        { title: 'Nombre', data: 'Nombre', type: 'string' },
        { title: '', data: 'btnIr', type: 'html', class: 'col-xs-2' },
      ]
    )
  };

  constructor(
    private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute) {
    this.iniUsuarioTabla();
  }

  ngOnInit() {
  }

  iniUsuarioTabla() {
    this.usuarioService.getUsuarioEscuela(
      function (usuarios) {
        usuarios.forEach(element => {
          element.tipo = '';
          // tslint:disable-next-line:curly
          if (element.Nombre === null) element.Nombre = '';
          // tslint:disable-next-line:curly
          if (element.Email === null) element.Email = '';
          if (element.IdMonitor !== 0) {
            element.tipo = 'Monitor';
            // tslint:disable-next-line:curly
            if (element.EsGestor !== null) element.tipo += ' y Gestor';
          }
          // tslint:disable-next-line:curly
          if (element.IdCliente !== 0) element.tipo = 'Cliente';
          element.btnIr = '<button  id="' + element.Id + '" class="btn btn-fill  btn-default"> Modificar usuario </button>';
        });
        this.tablas.monitor.dtDatos = usuarios;
        this.tablas.monitor.dtOptions.data = usuarios;
        this.tablas.monitor.dtOptions.aaData = usuarios;
        this.tablas.monitor.dtTrigger.next();
      }.bind(this));
  }

  clickTable(event) {
    if (event.srcElement.localName === 'button') {
      const id = event.srcElement.id;
      this.router.navigate(['/usuario/' + id]);
    }

  }
  addUsuario() {
    this.router.navigate(['/nuevo-usuario']);
  }
}
