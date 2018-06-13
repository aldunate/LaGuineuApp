import { Component, OnInit, OnDestroy } from '@angular/core';
import { MultiSelect, ConfMultiSelect, UtilFechas } from '../../util/global';
import { UtilService } from '../../util/service/util.service';
import { MonitorService } from '../service/monitor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnDestroy {

  monitor: any;
  idMonitor: number;
  monitorCargado = false;
  imageToShow = true;
  isImageLoading = true;

  constructor(public monitorService: MonitorService,
    private router: Router, private utilService: UtilService) {
    const aux = this.router.url.split('/');
    this.idMonitor = Number.parseInt(aux[aux.length - 1]);
    this.getMonitor();
  }

  ngOnDestroy() {
    this.monitorService.monitor.next(null);
  }

  getMonitor() {
    this.monitorService.getMonitor(this.idMonitor);
    this.monitorService.monitor$.subscribe(monitor => {
      if (monitor !== null) {
        this.monitor = monitor;
        this.utilService.setTextoSuperior({
          titulo: 'Monitor ' + monitor.Monitor.Nombre + ' ' + monitor.Monitor.Apellidos,
          href: 'monitor/' + monitor.Monitor.Id
        });
        this.iniMonitor();
      }
    });
  }

  iniMonitor() {
    if (this.monitor.Monitor.FotoPerfil !== '' && this.monitor.Monitor.FotoPerfil !== undefined) {
      this.monitorService.getImgPerfil(this.monitor.Monitor.FotoPerfil);
    }
    this.monitor.Monitor.edad = UtilFechas.calculaEdad(this.monitor.Monitor.FechaNacimiento);
    this.monitor.Monitor.edad += ' años';
    this.monitorCargado = true;
  }

}
