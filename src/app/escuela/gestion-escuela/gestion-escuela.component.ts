

import { Component, OnInit, ChangeDetectorRef, KeyValueDiffers, EventEmitter, Output, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GlobalVar, UtilFechas, MultiSelect, UtilDataTable, ConfMultiSelect } from '../../util/global';
import { FormControl } from '@angular/forms';

import { ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarUtils } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { MonthView } from 'calendar-utils';
import { EscuelaService } from '../service/escuela.service';
import { MonitorService } from '../../monitor/service/monitor.service';
import { forEach } from '@angular/router/src/utils/collection';
import { EstacionService } from '../../estacion/service/estacion.service';


@Component({
  selector: 'app-gestion-escuela',
  templateUrl: './gestion-escuela.component.html',
  styleUrls: ['./gestion-escuela.component.css']
})
export class GestionEscuelaComponent implements OnInit {

  Escuela = {
    Id: 0,
    Nombre: '',
    Direccion: '',
    Telefono: '',
    Email: '',
    FotoPerfil: ''
  };

  Monitores: any;
  imgConf = {
    src: '../../../assets/img/sinPerfil-660x660.png',
    class: 'image img-rounded img-responsive',
    style: ''
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

  /* PESTAÑA AJUSTES */
  confSelEst: ConfMultiSelect;
  etiquetas: any;

  constructor(private escuelaService: EscuelaService,
    private monitorService: MonitorService,
    private router: Router, private route: ActivatedRoute,
    private estacionService: EstacionService) {

    this.iniEscuela();
    this.iniSelectedEstacion();
    this.iniMonitorTabla();
  }

  ngOnInit() {
  }

  iniEscuela() {
    this.escuelaService.getEscuela(
      function (escuela) {
        this.Escuela = escuela;
        if (this.Escuela.FotoPerfil !== undefined) {
          this.imgConf.src = '../../../assets/img/perfiles/' + this.Escuela.FotoPerfil;
        }
      }.bind(this));
  }

  // Pestañas
  /* MURO */

  /* PESTAÑAS
    MONITORES */

  iniMonitorTabla() {
    this.monitorService.getMonitoresEscuela(
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

  // Pestañas
  /* Ajustes */

  iniSelectedEstacion() {
    this.estacionService.getEstaciones(function (estaciones) {
      this.escuelaService.getEscuelaEstacion(0, // Parametro falso
        function (estacionSelected) {
          for (const estacion of estacionSelected) {
            this.confSelEst.selectedModel.push(estacion.IdEstacion);
            this.etiquetas.push(this.confSelEst.dataModel.find(x => x.id === estacion.IdEstacion));
          }
        }.bind(this));
      this.confSelEst.dataModel = MultiSelect.iniDataModel(estaciones, 'Id', 'Name');
    }.bind(this));
    this.confSelEst = MultiSelect.iniMultiSelect('estación', 'estaciones');
  }

  changeMultiselect(evento) {
    this.etiquetas = [];
    for (const id of this.confSelEst.selectedModel) {
      this.etiquetas.push(this.confSelEst.dataModel.find(x => x.id === id));
    }
  }

}
