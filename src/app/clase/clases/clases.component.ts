import { Component, OnInit } from '@angular/core';
import { UtilDataTable } from '../../util/global';
import { EscuelaService } from '../../escuela/service/escuela.service';
import { Router } from '@angular/router';
import { ClaseService } from '../service/clase.service';
import { UtilService } from '../../util/service/util.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent {


  tablaClases = UtilDataTable.iniDataTable(
    [
      UtilDataTable.iniFiltro('Estacion'),
      UtilDataTable.iniFiltro('Nivel')
    ],
    [
      { title: 'Personas', data: 'Personas', type: 'string' },
      { title: 'Identificador', data: 'Nombre', type: 'string' },
      { title: 'Fecha', data: 'Fecha', type: 'string' },

      { title: 'Estacion', data: 'Estacion', type: 'string' },
      { title: 'Nivel', data: 'Nivel', type: 'string' },
      { title: '', data: 'btnIr', type: 'html', orderable: false, className: 'col-xs-1' }
    ]
  );


  constructor(private escuelaService: EscuelaService, private claseService: ClaseService,
    private router: Router, private utilService: UtilService) {
    this.iniMonitorTabla();

  }

  iniMonitorTabla() {
    this.claseService.getClasesEscuela(
      function (clases) {
        if (clases !== null) {
          this.tablaClases.dtDatos = clases;
          this.tablaClases.dtOptions.data = clases;
          this.tablaClases.dtOptions.aaData = clases;
          this.tablaClases.dtTrigger.next();
        }
      }.bind(this));
  }
  clickTable(event) {
    if (event.srcElement.localName === 'button') {
      const id = event.srcElement.id;
      this.router.navigate(['/clase/' + id]);
    }
  }

  addClase() {
    this.router.navigate(['/clase-nueva']);
  }

}
