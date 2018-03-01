

import { Component, OnInit, ChangeDetectorRef, KeyValueDiffers, EventEmitter, Output, ViewChild } from '@angular/core';
import { MonitorService } from '../service/monitor.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GlobalVar, UtilFechas, MultiSelect, ConfMultiSelect, DatePicker } from '../../util/global';
import { FormControl } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarUtils } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { MonthView } from 'calendar-utils';
import { EstacionService } from '../../estacion/service/estacion.service';
import { Monitor } from '../../util/model/monitor';
import { UtilService } from '../../util/service/util.service';


@Component({
  selector: 'app-editar-monitor',
  templateUrl: './editar-monitor.component.html',
  styleUrls: ['./editar-monitor.component.css']
})
export class EditarMonitorComponent implements OnInit {

  monitor: any;
  // personal
  idMonitor: number;
  selTitulo: ConfMultiSelect;
  imgConf = {
    src: '../../../assets/img/sinPerfil-660x660.png',
    class: 'image img-rounded img-responsive img200x200',
    style: ''
  };
  monitorCargado = false;

  constructor(private monitorService: MonitorService,
    private router: Router, private route: ActivatedRoute, private estacionService: EstacionService, private utilService: UtilService) {
    const aux = this.router.url.split('/');
    this.idMonitor = Number.parseInt(aux[aux.length - 1]);
    this.iniMuro();
    this.iniPersonal();
    this.getMonitor();
    this.selTitulo = MultiSelect.iniMultiSelect('título', 'títulos');
  }

  ngOnInit() {
  }

  getMonitor() {
    this.monitorService.getMonitor(this.idMonitor,
      function (monitor) {
        monitor.titulo = '';
        for (let i = 0; i < monitor.Titulos.length; i++) {
          monitor.titulo += ' ' + monitor.Titulos[i].Titulo;
        }
        this.monitor = monitor;
        this.monitor.edad = UtilFechas.calculaEdad(monitor.FechaNacimiento);
        this.monitor.edad += ' años';
        if (this.monitor.FortoPerfil !== undefined) {
          this.imgConf.src = '../../../assets/img/perfiles/' + monitor.FotoPerfil;
        }
        this.iniSelectedTitulos();
        this.cargado = true;
        this.monitorCargado = true;
      }.bind(this));
  }

  // Pestañas
  /* MURO */
  iniMuro() { }

  // PERSONAL
  iniPersonal() {

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
    this.monitorService.postMonitor(this.monitor, titulos, undefined,
      function () {

      });
  }

  personalCambios(evento) {
  }

}
