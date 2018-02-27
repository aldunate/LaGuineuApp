

import { Component, OnInit, ChangeDetectorRef, KeyValueDiffers, EventEmitter, Output } from '@angular/core';
import { MonitorService } from '../service/monitor.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GlobalVar, UtilFechas, MultiSelect, ConfigCalendario, UtilCalendario } from '../../util/global';
import { FormControl } from '@angular/forms';

import { ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarUtils } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { MonthView } from 'calendar-utils';
import { EstacionService } from '../../estacion/service/estacion.service';


@Component({
  selector: 'app-editar-monitor',
  templateUrl: './editar-monitor.component.html',
  styleUrls: ['./editar-monitor.component.css']
})
export class EditarMonitorComponent implements OnInit {

  monitor: any;
  idMonitor: number;
  imgConf = {
    src: '../../../assets/img/sinPerfil-660x660.png',
    class: 'image img-rounded img-responsive img200x200',
    style: ''
  };

  // CALENDARIO
  estaciones: any;
  auxEst: any;
  estacionesSelect = [];
  estLength = 0;
  confSelEst: any;

  // angular calendar
  configCalendario = new ConfigCalendario();
  // personal
  cambios = false;
  titulacionList = [
    { id: 1, name: 'TD1' },
    { id: 2, name: 'TD2' },
    { id: 3, name: 'TD3' },
  ];
  differ: any;
  cargado = false;

  constructor(private monitorService: MonitorService,
    private router: Router, private route: ActivatedRoute, private estacionService: EstacionService) {
    const aux = this.router.url.split('/');
    this.idMonitor = Number.parseInt(aux[aux.length - 1]);
    this.getMonitor();
    this.iniMuro();
    this.iniCalendario();
    this.iniPersona();
    this.confSelEst = MultiSelect.iniMultiSelect('estación', 'estaciones');
  }

  ngOnInit() {
  }

  getMonitor() {
    this.monitor = {
      Id: this.idMonitor,
      Nombre: '',
      Apellidos: '',
      edad: '',
      titulo: ''
    };

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
        // Monitor disponible
        this.configCalendario.events = UtilCalendario.iniEvents(this.monitor.FechasDisponibles, 'Disponible');
        this.configCalendario.trigger.next(this.configCalendario.events);
        this.cargado = true;
        // Monitor Estaciones
        for (let i = 0; i < this.monitor.EstacionesDisponibles.length; i++) {
          const IdEstacion = this.monitor.EstacionesDisponibles[i].IdEstacion;
          this.estacionesSelect.push(this.confSelEst.myOptions.find(
            x => x.id === IdEstacion));
          this.confSelEst.optionsModel.push(this.monitor.EstacionesDisponibles[i].IdEstacion);
        }
      }.bind(this));
  }

  // Pestañas
  /* MURO */
  iniMuro() { }

  /* Calendario */
  iniCalendario() {
    $('.datepicker').datetimepicker({
      format: 'MM/DD/YYYY',
      icons: {
          time: 'fa fa-clock-o',
          date: 'fa fa-calendar',
          up: 'fa fa-chevron-up',
          down: 'fa fa-chevron-down',
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-screenshot',
          clear: 'fa fa-trash',
          close: 'fa fa-remove',
          inline: true
      }
   });
    this.configCalendario.vistas.headerRight = false;
    this.configCalendario.vistas.selectMonth = true;
    this.configCalendario = UtilCalendario.iniCalendario(this.configCalendario);
    this.estacionService.getEstaciones(this.respGetEstaciones.bind(this));
  }

  viewDateChange($event) {
    const x = 1;
  }
  respGetEstaciones(estaciones) {
    this.estaciones = estaciones;
    this.estaciones.forEach(function (v) { delete v.Contry; delete v.IdDefecto; delete v.Notes; });
    this.confSelEst.myOptions = MultiSelect.iniDataModel(this.estaciones, 'Id', 'Name');
  }


  onChangeEstaciones(estacion) {
    if (estacion.length > 0) {
      if (this.estLength < estacion.length) {
        // Add
        this.estacionesSelect.push(
          this.confSelEst.myOptions.find(auxEst => auxEst.id === estacion[estacion.length - 1])
        );
        this.estLength++;
      } else {
        // Delete
        const aux = [];
        for (let i = 0; i < estacion.length; i++) {
          aux.push(this.estacionesSelect.find(est => est.id === estacion[i]));
        }
        this.estacionesSelect = aux;
        this.estLength--;
      }
    } else {
      this.estacionesSelect = [];
    }
  }
  saveCalendario() {
    this.monitor.FechasDisponibles = [];
    this.monitor.EstacionesDisponibles = [];
    delete this.monitor.edad;
    delete this.monitor.titulo;
    this.monitor.Opcion = 'Calendario';
    for (const estacion of this.estacionesSelect) {
      this.monitor.EstacionesDisponibles.push({
        IdEstacion: estacion.id,
        idMonitor: this.monitor.Id,
        Id: 0
      });
    }
    /*for (const evento of this.configCalendario.events) {
      this.monitor.FechasDisponibles.push({
        FechaEvento: new Date(evento.start),
        IdMonitor: this.monitor.Id,
        Id: 0
      });
    }*/
    this.monitorService.saveCalendario(this.monitor, function (eventos) {
    }.bind(this));
  }

  // PERSONAL
  iniPersona() { }

  personalCambios(evento) {
    this.cambios = true;
  }

}
