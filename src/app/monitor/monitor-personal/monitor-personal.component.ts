import { Component, OnInit, Input } from '@angular/core';
import { ConfMultiSelect, MultiSelect } from '../../util/global';
import { MonitorService, MonitorModel } from '../service/monitor.service';
import { UtilService } from '../../util/service/util.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

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
  existeEmail = false;

  constructor(private monitorService: MonitorService, private utilService: UtilService,
    private messageService: MessageService) {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });

    this.monitorService.imgPerfil$.subscribe(src => {
      if (src !== '') {
        this.imgConf.view = false;
        setTimeout(function () {
          this.imgConf.src = src.__zone_symbol__originalInstance.result;
          this.imgConf.view = true;
        }.bind(this), 100);
      }
    });
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
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
    let aux = this.monitor.Monitor.FechaNacimiento;
    if (aux !== null) {
      aux = aux.split('T')[0];
      this.monitor.Monitor.FechaNacimiento = aux;
    }
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
        IdTitulo: titulo.Id ? titulo.Id : titulo,
        IdMonitor: this.monitor.Monitor.Id
      });
    }
    this.monitor.Titulos = new Array(titulos);
    this.monitorService.postMonitor(this.monitor, 'Monitor',
      function (confirmacion, monitor) {
        if (monitor === null) {
          this.existeEmail = true;
        } else {
          this.existeEmail = false;
          this.msgs.push(confirmacion);
        }
      }.bind(this));
  }

}
