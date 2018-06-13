import { Component, OnInit } from '@angular/core';
import { UtilDataTable, UtilFechas } from '../../util/global';
import { ClienteService } from '../service/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  tblClientes = UtilDataTable.iniDataTable(
    [
      UtilDataTable.iniFiltro('Nombre'),
      UtilDataTable.iniFiltro('Apellidos')
    ],
    [
      { title: 'Nombre', data: 'Nombre', type: 'string' },
      { title: 'Apellidos', data: 'Apellidos', type: 'string' },
      { title: 'Edad', data: 'edad', type: 'num' },
      { title: '', data: 'btnIr', type: 'html', orderable: false, className: 'col-xs-1' }
    ]
  );

  constructor(
    private clienteService: ClienteService,
    private router: Router, private route: ActivatedRoute) {
    this.iniClienteTabla();
  }

  ngOnInit() {
  }

  iniClienteTabla() {
    this.clienteService.getClientesEscuela(
      function (clientes) {
        for (const cliente of clientes) {
          cliente.edad = UtilFechas.calculaEdad(cliente.FechaNacimiento);
          cliente.btnIr = '<button  id="' + cliente.Id + '" class="btn btn-fill  btn-default"> Modificar cliente </button>';
        }
        this.tblClientes.dtDatos = clientes;
        this.tblClientes.dtOptions.data = clientes;
        this.tblClientes.dtOptions.aaData = clientes;
        this.tblClientes.dtTrigger.next();
      }.bind(this));
  }

  clickTable(event) {
    if (event.srcElement.localName === 'button') {
      const id = event.srcElement.id;
      this.router.navigate(['/cliente/' + id]);
    }
  }

  addCliente() {
    this.router.navigate(['/cliente-nuevo']);
  }

}
