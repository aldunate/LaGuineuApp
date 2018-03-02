import { Component, OnInit } from '@angular/core';
import { MultiSelect, ConfMultiSelect, UtilFechas } from '../../util/global';
import { UtilService } from '../../util/service/util.service';
import { EstacionService } from '../../estacion/service/estacion.service';
import { MonitorService } from '../service/monitor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  monitor: any;
  idMonitor: number;
  monitorCargado = false;

  constructor(public monitorService: MonitorService,
    private router: Router, private estacionService: EstacionService,
    private utilService: UtilService) {

    const aux = this.router.url.split('/');
    this.idMonitor = Number.parseInt(aux[aux.length - 1]);
    this.getMonitor();
  }

  ngOnInit() {
  }

  getMonitor() {
    this.monitorService.getMonitor(this.idMonitor);
    this.monitorService.monitor$.subscribe(monitor => {
      this.monitor = monitor;
      this.monitor.edad = UtilFechas.calculaEdad(monitor.FechaNacimiento);
      this.monitor.edad += ' años';
      this.monitorCargado = true;
    });
  }

}
