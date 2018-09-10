import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigCalendario, UtilCalendario, MultiSelect, ConfMultiSelect, UtilDataTable } from '../../util/global';
import { UtilService } from '../../util/service/util.service';
import { MonitorService, Monitor } from '../../monitor/service/monitor.service';
import { CalendarDateFormatter, DateFormatterParams, CalendarUtils } from 'angular-calendar';
import { getISOWeek } from 'date-fns';
import { DatePipe } from '@angular/common';
export class CustomDateFormatter extends CalendarDateFormatter {
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new DatePipe(locale).transform(date, 'y', locale);
    const weekNumber: number = getISOWeek(date);
    return `Semana ${weekNumber} del ${year}`;
  }
}
import { Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ViewChildren } from '@angular/core';
import * as moment from 'moment';
import { DAYS_OF_WEEK } from 'angular-calendar';
import { CalendarEvent } from 'angular-calendar';
import { CalendarMonthViewDay } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ClaseService, Clase, ClaseModel } from '../service/clase.service';
import { EscuelaService } from '../../escuela/service/escuela.service';
import { WeatherIcons } from '../../util/service/weather';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/api';
import { DataTableDirective } from 'angular-datatables';
import * as $ from 'jquery';


@Component({
  selector: 'app-clase-asignar',
  templateUrl: './clase-asignar.component.html',
  styleUrls: ['./clase-asignar.component.css']
})

export class ClaseAsignarComponent implements OnInit {


  // Calendario
  configCalendario = new ConfigCalendario();
  viewChange: EventEmitter<string> = new EventEmitter();
  viewDateChange: EventEmitter<Date> = new EventEmitter();
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  body: CalendarMonthViewDay[];
  msgs: Message[] = [];

  // Tabla sin asignar
  tablaSinAsignar = UtilDataTable.iniDataTable(
    [
      // UtilDataTable.iniFiltro('Nombre'),
    ],
    [
      { title: 'Alumnos', data: 'Personas', type: 'string' },
      { title: 'Nombre', data: 'Nombre', type: 'string' },
      { title: 'Estación', data: 'IdEstacion', type: 'string' },
      { title: '', data: 'btnIr', type: 'html', orderable: false, className: 'col-xs-1' }
    ]
  );
  tableDatos = new Subject();
  firstTime = true;

  // Estacion
  estacion;
  estacionSelect: any;
  estaciones: any[] = [];

  weather;
  weatherIcons = WeatherIcons;
  dia = {
    fecha: undefined,
    horas: [],
    disponible: false
  };
  // Monitores
  monitores = {
    todos: [],
    visibles: []
  };

  confSelMon: ConfMultiSelect;
  monitorDisabled = true;

  // Clases
  clases = {
    todas: new Array<ClaseModel>(),
    sinAsignar: new Array<any>(),
    asignadas: new Array<ClaseModel>()
  };
  seleccion = new ClaseModel;

  constructor(private utilService: UtilService, private monitorService: MonitorService,
    private escuelaService: EscuelaService, private claseService: ClaseService, private messageService: MessageService) {

    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    this.confSelMon = MultiSelect.iniMultiSelect('', '', {
      dynamicTitleMaxItems: 1,
    });

    /* Calendario */
    this.configCalendario.vistas.headerRight = false;
    this.configCalendario.vistas.headerChangeDate = false;
    this.configCalendario.vistas.headerDate = false;
    this.configCalendario.vistas.selectMonth = true;
    this.configCalendario.view = 'day';
    this.configCalendario = UtilCalendario.iniCalendario(this.configCalendario);

    this.getEstacionTiempo();
    this.getMonitoresEscuela();
    this.getClasesEscuelaFecha();
    this.getEstaciones();
  }

  ngOnInit() {
  }

  eventClicked(event) {
  }
  eventTimes($event) {
  }
  hourSegmentClicked(fecha) {
    if (this.seleccion !== null) {
      const hora = fecha.date.getHours();
      // const minutos = fecha.date.getMinutes();
      if (this.confSelMon.selectedModel.length > 0 && this.seleccion.Clase !== null) {
        this.seleccion.Clase.HoraInicio = hora;
        this.seleccion.Clase.HoraFin = hora + this.seleccion.Clase.Duracion;
        this.asignaClase();
      }
    }
  }

  asignaClase() {
    this.seleccion.Clase.IdEstacion = this.estacionSelect.Id;
    this.seleccion.Monitores = [];
    this.confSelMon.selectedModel.forEach(idMonitor => {
      this.seleccion.Monitores.push({
        IdClase: this.seleccion.Clase.Id,
        IdMonitor: idMonitor
      });
    });
    this.clases.asignadas.push(this.seleccion);
    this.clases.sinAsignar = this.clases.sinAsignar.filter(x => x.Id !== this.seleccion.Clase.Id);
    this.seleccion.Clase = {
      IdEstacion: this.seleccion.Clase.IdEstacion,
      HoraFin: this.seleccion.Clase.HoraFin,
      HoraInicio: this.seleccion.Clase.HoraInicio,
      Id: this.seleccion.Clase.Id,
    };
    this.postAsignada(this.seleccion);
    this.seleccion = new ClaseModel;
  }

  changeEstacion(x) {
    const index = this.estaciones.indexOf(this.estacionSelect);
    const length = this.estaciones.length;
    switch (true) {
      case x === -1 && index === 0: {
        this.estacionSelect = this.estaciones[length - 1];
        break;
      }
      case x === 1 && index === (length - 1): {
        this.estacionSelect = this.estaciones[0];
        break;
      }
      default: {
        this.estacionSelect = this.estaciones[index + x];
        break;
      }
    }
    this.getClasesEscuelaFecha();
    this.getEstacionTiempo();
  }

  changeDay() {
    this.rellenarTiempo(this.configCalendario.viewDate);
    this.getClasesEscuelaFecha();
  }

  reloadClases() {
    const idEstacion = this.estacionSelect.Id;
    const clases = [];
    this.clases.sinAsignar = [];
    this.clases.asignadas = [];

    this.clases.todas.forEach(c => {
      if ((c.Monitores.length === 0 || c.Clase.HoraInicio === null || c.Clase.HoraFin === null) &&
        (c.Clase.IdEstacion === idEstacion || c.Clase.IdEstacion === null)) {
        const s = c.Clase;
        s.btnIr = '<button  id="' + c.Clase.Id + '" class="btn btn-fill  btn-success"> Seleccionar clase </button>';
        this.clases.sinAsignar.push(s);
      } else {
        if (c.Monitores.length > 0 && c.Clase.HoraInicio !== null && c.Clase.HoraFin !== null &&
          c.Clase.IdEstacion === idEstacion) {
          this.clases.asignadas.push(c);
        }
      }
    });

    if (this.firstTime) {
      this.firstTime = false;
      this.tablaSinAsignar.dtDatos = this.clases.sinAsignar;
      this.tablaSinAsignar.dtOptions.data = this.clases.sinAsignar;
      this.tablaSinAsignar.dtOptions.aaData = this.clases.sinAsignar;
      this.tablaSinAsignar.dtTrigger.next();
    } else {
      this.tablaSinAsignar.dtTrigger.next(this.clases.sinAsignar);
    }
    const eventos = [];
    this.monitores.visibles = [];
    this.clases.asignadas.forEach(asignada => {
      asignada.Monitores.forEach(cm => {
        this.monitores.todos.forEach(monitor => {
          if (monitor.Id === cm.IdMonitor) {
            cm.nombre = monitor.Nombre;
            cm.Apellidos = monitor.Apellidos;
            this.monitores.visibles.push(monitor);
          }
        });
      });
      const horaIni = parseFloat(asignada.Clase.HoraInicio);
      const horaFin = parseFloat(asignada.Clase.HoraFin);
      eventos.push({
        clase: asignada,
        start: new Date(new Date(asignada.Clase.Fecha).setHours(horaIni)),
        end: new Date(new Date(asignada.Clase.Fecha).setHours(horaFin)),
        allDay: false,
        title: asignada.Clase.Nombre,
        color: {
          primary: '#e3bc08',
          secondary: '#FDF1BA'
        },
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
      });

    });
    this.configCalendario.events = eventos;
    this.configCalendario.trigger.next();
  }

  postAsignada(clase) {
    this.claseService.postAsignada(clase,
      function (idClase) {
        this.monitorDisabled = false;
        this.getClasesEscuelaFecha();
      }.bind(this));
  }

  rellenarTiempo(fecha: Date) {
    fecha = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    this.dia.disponible = false;
    this.weather.some(dia => {
      dia.fecha = new Date(dia.fecha.getFullYear(), dia.fecha.getMonth(), dia.fecha.getDate());
      if (fecha.getTime() === dia.fecha.getTime()) {
        this.dia = dia;
        return this.dia.disponible = true;
      } else {
        this.dia.disponible = false;
      }
    });
  }

  getClasesEscuelaFecha() {
    this.claseService.getClasesEscuelaFecha(this.configCalendario.viewDate,
      function (clases: ClaseModel[]) {
        if (clases.length === 0) {
          this.clases.todas = [];
        } else {
          this.clases.todas = clases;
        }
        this.reloadClases();
      }.bind(this)
    );
  }

  changeMultiselectMonitores() {

  }
  getMonitoresEscuela() {
    this.monitorService.getMonitoresEscuela(
      function (monitores) {
        monitores.forEach(element => {
          element.nombreApellido = element.Nombre + ' ' + element.Apellidos;
        });
        this.monitores.todos = monitores;
        this.monitores.visibles = monitores;
        this.confSelMon.dataModel = MultiSelect.iniDataModel(this.monitores.visibles, 'Id', 'nombreApellido');
      }.bind(this)
    );
  }

  getEstaciones() {
    this.escuelaService.escuela$.subscribe(
      escuela => {
        if (escuela !== null) {
          this.estaciones = escuela.EstacionesDisponibles;
          this.estacionSelect = this.estaciones[0];
        }
      }
    );
  }

  clickTableSinAsignar(event) {
    if (event.srcElement.localName === 'button') {
      const fila = event.srcElement.parentElement.parentElement;
      const button = event.srcElement;
      if (fila.className.includes('rowSelected')) {
        fila.className = fila.className.split(' rowSelected')[0];
        button.innerHTML = 'Seleccionar clase';
        button.className = 'btn btn-fill btn-success';
        this.monitorDisabled = true;
      } else {
        // Jquery
        $('table button').html('Seleccionar clase').attr('class', 'btn btn-fill btn-success');
        $('table .rowSelected').attr('class', 'odd');
        // Fin Jquery
        fila.className += ' rowSelected';
        button.innerHTML = 'Quitar clase';
        button.className = 'btn btn-fill btn-default';

        // Fila seleccionada
        const id = event.srcElement.id;
        this.claseSeleccionada(id);
      }
    }
  }

  claseSeleccionada(id) {
    this.confSelMon.selectedModel = [];
    // tslint:disable-next-line:radix
    id = parseInt(id);
    const claseModel = this.clases.todas.find(c => {
      if (c.Clase.Id === id) {
        return true;
      }
    });
    this.seleccion.Clase = claseModel.Clase;
    this.monitorDisabled = false;
  }

  getEstacionTiempo() {
    this.utilService.getEstacionTiempo(
      function (tiempo) {
        const ahoraFecha = new Date();
        const ahoraHora = ahoraFecha.getHours();

        const weather = [];
        let horas = [];
        tiempo.list.forEach(element => {
          const hora = new Date(element.dt_txt).getHours();
          // tslint:disable-next-line:prefer-const
          let dia;
          if (hora === 9) {
            element.hora = '09:00';
            horas.push(element);
          }
          if (hora === 12) {
            element.hora = '12:00';
            horas.push(element);
          }
          if (hora === 15) {
            element.hora = '15:00';
            horas.push(element);
          }
          if (hora === 18) {
            element.hora = '18:00';
            horas.push(element);
            const aux = new Date(element.dt_txt);
            weather.push({
              fecha: new Date(aux.getFullYear(), aux.getMonth(), aux.getDate()),
              horas: horas
            });
            horas = [];
          }
        });
        this.weather = weather;
        this.rellenarTiempo(this.configCalendario.viewDate);
      }.bind(this));
  }


}
