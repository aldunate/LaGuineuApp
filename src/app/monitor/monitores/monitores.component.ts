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

  Escuela = {
    Id: 0,
    Nombre: '',
    Direccion: '',
    Telefono: '',
    Email: '',
    FotoPerfil: ''
  };
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
  visibleMonitor = false;

  constructor(private escuelaService: EscuelaService,
    private monitorService: MonitorService,
    private router: Router, private route: ActivatedRoute) {

    const aux = this.router.url.split('/');
    this.Escuela.Id = Number.parseInt(aux[aux.length - 1]);
    this.iniEscuela();
    this.iniMonitorTabla();
  }

  ngOnInit() {
  }

  iniEscuela() {
    this.escuelaService.getEscuela(this.Escuela.Id,
      function (escuela) {
        this.Escuela = escuela;
      }.bind(this));
  }

  iniMonitorTabla() {
    this.monitorService.getMonitoresEscuela(this.Escuela.Id,
      function (monitores) {
        for (const monitor of monitores) {
          monitor.edad = UtilFechas.calculaEdad(monitor.FechaNacimiento);
          monitor.btnIr = '<button  id="' + monitor.Id + '" class="btn btn-primary"> Ver monitor </button>';
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
    if (this.visibleMonitor) {
      this.visibleMonitor = false;
    } else {
      this.visibleMonitor = true;
    }
  }
}
