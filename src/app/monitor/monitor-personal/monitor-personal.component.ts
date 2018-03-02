import { Component, OnInit, Input } from '@angular/core';
import { ConfMultiSelect, MultiSelect } from '../../util/global';
import { MonitorService } from '../service/monitor.service';
import { UtilService } from '../../util/service/util.service';

@Component({
  selector: 'app-monitor-personal',
  templateUrl: './monitor-personal.component.html',
  styleUrls: ['./monitor-personal.component.css']
})
export class MonitorPersonalComponent implements OnInit {

  monitor: any;
  usuario = {
    Nombre: '',
    Email: ''
  };
  selTitulo: ConfMultiSelect;
  imgConf = {
    src: '../../../assets/img/sinPerfil-660x660.png',
    class: 'image img-rounded img-responsive',
    style: ''
  };

  constructor(private monitorService: MonitorService, private utilService: UtilService) {
    this.selTitulo = MultiSelect.iniMultiSelect('título', 'títulos');
    this.monitorService.monitor$.subscribe(monitor => {
      this.monitor = monitor;
      if (this.monitor.FortoPerfil !== undefined) {
        this.imgConf.src = '../../../assets/img/perfiles/' + this.monitor.FotoPerfil;
      }
      this.iniSelectedTitulos();
    });
  }

  ngOnInit() {
  }

  iniSelectedTitulos() {
    this.utilService.getTitulos(
      function (titulos) {
        this.selTitulo.dataModel = MultiSelect.iniDataModel(titulos, 'Id', 'Nombre');
        for (const titulo of this.monitor.Titulos) {
          this.selTitulo.selectedModel.push(titulo.IdTitulo);
        }
      }.bind(this)
    );
  }

  savePersonal() {
    const titulos = [];
    for (const titulo of this.monitor.titulos) {
      titulos.push({
        IdTitulo: titulo
      });
    }
    this.monitorService.postMonitor(this.monitor, titulos, this.usuario,
      function () {

      });
  }

}
