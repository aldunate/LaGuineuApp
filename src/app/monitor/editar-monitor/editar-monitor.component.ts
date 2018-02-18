

import { Component, OnInit, ChangeDetectorRef, KeyValueDiffers, EventEmitter, Output } from '@angular/core';
import { MonitorService } from '../service/monitor.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GlobalVar, UtilFechas, MultiSelect } from '../../util/global';
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
  configCalendar = {
    headerRight: false
  };
  refresh: Subject<any> = new Subject();
  utils: CalendarUtils;
  viewMonth: MonthView;

  // angular calendar
  view = 'month';
  viewDate = new Date();
  events: CalendarEvent[] = [];
  locale = 'es';
  // personal
  cambios = false;
  titulacionList = [
    { id: 1, name: 'TD1' },
    { id: 2, name: 'TD2' },
    { id: 3, name: 'TD3' },
  ];
  differ: any;

  constructor(private monitorService: MonitorService,
    private router: Router, private route: ActivatedRoute, private estacionService: EstacionService) {
      const aux = this.router.url.split('/');
      const idMonitor = Number.parseInt(aux[aux.length - 1]);

    this.monitorService.getMonitor( idMonitor, this.respGetMonitor.bind(this));
    this.monitor = {
      Nombre: '',
      Apellidos: '',
      edad: '',
      titulo: ''
    };

    this.iniMuro();
    this.iniCalendario();
    this.iniPersona();
    this.confSelEst = MultiSelect.iniMultiSelect('estación', 'estaciones');
  }

  ngOnInit() {
  }

  respGetMonitor(monitor) {
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
    const fechasDisponibles = []; // this.monitor.FechasDisponibles;
    for (let i = 0; i < this.monitor.FechasDisponibles.length; i++) {
      fechasDisponibles.push({
        start: new Date(this.monitor.FechasDisponibles[i].FechaEvento),
        allDay: true,
        title: 'Disponible',
        color: {
          primary: '#e3bc08',
          secondary: '#FDF1BA'
        }
      });
    }
    this.events = fechasDisponibles;
    this.refresh.next();
    // Monitor Estaciones
    for (let i = 0; i < this.monitor.EstacionesDisponibles.length; i++ ) {
      const IdEstacion = this.monitor.EstacionesDisponibles[i].IdEstacion;
      this.estacionesSelect.push(this.confSelEst.myOptions.find(
        x => x.id === IdEstacion));
        this.confSelEst.optionsModel.push(this.monitor.EstacionesDisponibles[i].IdEstacion);
    }
  }

  // Pestañas
  /* MURO */
  iniMuro() { }

  /* Calendario */
  iniCalendario() {
    this.estacionService.getEstaciones(this.respGetEstaciones.bind(this));

  }
  viewDateChange($event) {
    const x = 1;
  }
  respGetEstaciones(estaciones) {
    this.estaciones = estaciones;
    this.estaciones.forEach(function(v){ delete v.Contry; delete v.IdDefecto; delete v.Notes; });
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
    for (let i = 0; i < this.estacionesSelect.length; i++) {
      this.monitor.EstacionesDisponibles.push({
        IdEstacion: this.estacionesSelect[i].id,
        idMonitor: this.monitor.Id,
        Id: 0
      });
    }
    for (let i = 0; i < this.events.length; i++) {
      this.monitor.FechasDisponibles.push({
        FechaEvento: new Date(this.events[i].start),
        IdMonitor: this.monitor.Id,
        Id: 0
      });
    }
    this.monitorService.saveCalendario(this.monitor, this.respSaveCalendario.bind(this));
  }

  respSaveCalendario(eventos) {
  }

  // PERSONAL
  iniPersona() { }

  personalCambios(evento) {
    this.cambios = true;
  }

}
