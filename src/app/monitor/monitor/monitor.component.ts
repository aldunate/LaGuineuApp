import { Component, OnInit } from '@angular/core';
import { MultiSelect, ConfMultiSelect, UtilFechas } from '../../util/global';
import { UtilService } from '../../util/service/util.service';
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
  imageToShow = true;
  isImageLoading = true;

  constructor(public monitorService: MonitorService,
    private router: Router, private utilService: UtilService) {
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
      if (monitor.Monitor !== undefined) {
        if (monitor.Monitor.FotoPerfil !== '' && monitor.Monitor.FotoPerfil !== undefined) {
          this.monitorService.getImgPerfil(monitor.Monitor.FotoPerfil);
        }
        this.utilService.getEstaciones();
        this.utilService.getDeportes();
        this.utilService.getNiveles();
        this.utilService.getTitulos();
        this.monitor.Monitor.edad = UtilFechas.calculaEdad(monitor.Monitor.FechaNacimiento);
        this.monitor.Monitor.edad += ' años';
        this.monitorCargado = true;
      }
    });
  }

}

