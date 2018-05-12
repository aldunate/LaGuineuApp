import { Component, OnInit } from '@angular/core';
import { UtilDataTable, UtilFechas } from '../../util/global';
import { EscuelaService } from '../../escuela/service/escuela.service';
import { MonitorService } from '../service/monitor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.component.html',
  styleUrls: ['./monitores.component.css']
})
export class MonitoresComponent implements OnInit {

  tablas = {
    monitor: UtilDataTable.iniDataTable(
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
    )
  };


  constructor(
    private monitorService: MonitorService,
    private router: Router, private route: ActivatedRoute) {
    this.iniMonitorTabla();
  }

  ngOnInit() {
  }

  iniMonitorTabla() {
    this.monitorService.getMonitoresEscuela(
      function (monitores) {
        for (const monitor of monitores) {
          monitor.edad = UtilFechas.calculaEdad(monitor.FechaNacimiento);
          monitor.btnIr = '<button  id="' + monitor.Id + '" class="btn  btn-primary"> ir </button>';
        }
        this.tablas.monitor.dtDatos = monitores;
        this.tablas.monitor.dtOptions.data = monitores;
        this.tablas.monitor.dtOptions.aaData = monitores;
        this.tablas.monitor.dtTrigger.next();
      }.bind(this));
  }

  clickTable(event) {
    if (event.srcElement.localName === 'button') {
      const id = event.srcElement.id;
      this.router.navigate(['/monitor/' + id]);
    }
  }

  addMonitor() {
    this.router.navigate(['/crea-monitor']);
  }
}
