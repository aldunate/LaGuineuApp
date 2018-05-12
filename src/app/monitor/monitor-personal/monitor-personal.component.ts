import { Component, OnInit, Input } from '@angular/core';
import { ConfMultiSelect, MultiSelect } from '../../util/global';
import { MonitorService, MonitorModel } from '../service/monitor.service';
import { UtilService } from '../../util/service/util.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-monitor-personal',
  templateUrl: './monitor-personal.component.html',
  styleUrls: ['./monitor-personal.component.css']
})
export class MonitorPersonalComponent implements OnInit {

  monitor: MonitorModel;
  titulos;
  selTitulo: ConfMultiSelect;
  imgConf: any;
  msgs: Message[] = [];

  constructor(private monitorService: MonitorService, private utilService: UtilService) {
    this.imgConf = {
      src: '../../../assets/img/sinPerfil-660x660.png',
      class: 'img-rounded img-responsive',
      style: '',
      view: true,
      sendImg: function (imagen) {
        this.monitorService.postImgPerfil(this.monitor.Monitor.Id, imagen);
      }.bind(this)
    };
    this.selTitulo = MultiSelect.iniMultiSelect('título', 'títulos');
    this.titulos = this.utilService.titulos.getValue();
    if (this.titulos === null) {
      this.utilService.titulos$.subscribe(titulos => {
        if (titulos !== null) {
          this.inicio();
        }
      });
    } else {
      this.inicio();
    }
  }
  inicio() {
    this.selTitulo.dataModel = MultiSelect.iniDataModel(this.titulos, 'Id', 'Nombre');
    this.monitor = this.monitorService.monitor.getValue();
    if (this.monitor === null) {
      this.monitorService.monitor$.subscribe(monitor => {
        this.monitor = monitor;
        this.monitorCambios();
      });
    } else {
      this.monitorCambios();
    }
  }


  monitorCambios() {
    this.monitorTitulos();
    const aux: string = this.monitor.Monitor.FechaNacimiento.split('T')[0];
    this.monitor.Monitor.FechaNacimiento = aux;
    this.monitorService.imgPerfil$.subscribe(src => {
      if (src !== '') {
        this.imgConf.view = false;
        this.imgConf.src = src.__zone_symbol__originalInstance.result;
        this.imgConf.view = true;
      }
    });
  }

  ngOnInit() {
  }


  monitorTitulos() {
    for (const titulo of this.monitor.Titulos) {
      this.selTitulo.selectedModel.push(titulo.IdTitulo);
    }
  }

  savePersonal() {
    const titulos = [];
    for (const titulo of this.monitor.Titulos) {
      titulos.push({
        IdTitulo: titulo,
        IdMonitor: this.monitor.Monitor.Id
      });
    }
    this.monitor.Titulos = titulos;
    this.monitorService.postMonitor(this.monitor, 'Monitor',
      function (confirmacion) {
        this.msgs.push(confirmacion);
      });
  }

}
