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


  tablaMonitor = UtilDataTable.iniDataTable(
    [
      UtilDataTable.iniFiltro('Estacion'),
      UtilDataTable.iniFiltro('Nivel')
    ],
    [
      { title: 'Estacion', data: 'Clase.Estacion', type: 'string' },
      { title: 'Nivel', data: 'Clase.Nivel', type: 'string' },
      { title: '', data: 'btnIr', type: 'html', orderable: false, className: 'col-xs-1' }
    ]
  );

  constructor(private escuelaService: EscuelaService, private claseService: ClaseService,
    private router: Router, private utilService: UtilService) {

  }

  iniMonitorTabla() {
    this.claseService.getClasesEscuela();
    this.claseService.clases$.subscribe(clases => {
      for (const clase of clases) {
        clase.Aux.btnIr = '<button  id="' + clase.Clase.Id + '" class="btn btn-primary"> Ver clase </button>';
      }
      this.tablaMonitor.dtDatos = clases;
      this.tablaMonitor.dtOptions.data = clases;
      this.tablaMonitor.dtOptions.aaData = clases;
      this.tablaMonitor.dtTrigger.next();
    });
  }

  clickTable(event) {
    if (event.srcElement.localName === 'button') {
      const id = event.srcElement.id;
      this.router.navigate(['/clase/' + id]);
    }
  }

  addClase() {
    this.router.navigate(['/crea-clase']);
  }

}
