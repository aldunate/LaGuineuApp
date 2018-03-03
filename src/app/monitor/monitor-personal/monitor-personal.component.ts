import { Component, OnInit, Input } from '@angular/core';
import { ConfMultiSelect, MultiSelect } from '../../util/global';
import { MonitorService, MonitorModel } from '../service/monitor.service';
import { UtilService } from '../../util/service/util.service';

@Component({
  selector: 'app-monitor-personal',
  templateUrl: './monitor-personal.component.html',
  styleUrls: ['./monitor-personal.component.css']
})
export class MonitorPersonalComponent implements OnInit {

  monitor: MonitorModel;
  selTitulo: ConfMultiSelect;
  imgConf = {
    src: '../../../assets/img/sinPerfil-660x660.png',
    class: 'img-rounded img-responsive',
    style: ''
  };

  constructor(private monitorService: MonitorService, private utilService: UtilService) {
    this.selTitulo = MultiSelect.iniMultiSelect('título', 'títulos');
    this.monitorService.monitor$.subscribe(monitor => {
      this.monitor = monitor;
      const aux: string = this.monitor.Monitor.FechaNacimiento.split('T')[0];
      this.monitor.Monitor.FechaNacimiento = aux;
      if (this.monitor.Monitor.FotoPerfil !== undefined && this.monitor.Monitor.FotoPerfil !== ''
        && this.monitor.Monitor.FotoPerfil !== null) {
        this.imgConf.src = '../../../assets/img/perfiles/' + this.monitor.Monitor.FotoPerfil;
      }
      this.iniSelectedTitulos();
    });
  }

  ngOnInit() {
  }

  iniSelectedTitulos() {
    this.utilService.titulos$.subscribe(titulos => {
      this.selTitulo.dataModel = MultiSelect.iniDataModel(titulos, 'Id', 'Nombre');
      for (const titulo of this.monitor.Titulos) {
        this.selTitulo.selectedModel.push(titulo.IdTitulo);
      }
    });
  }

  savePersonal() {
    const titulos = [];
    for (const titulo of this.monitor.Titulos) {
      titulos.push({
        IdTitulo: titulo
      });
    }
    this.monitor.Titulos = titulos;
    this.monitorService.postMonitor(this.monitor,
      function () {

      });
  }

}
