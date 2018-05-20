import { Component, OnInit, Input } from '@angular/core';
import { DatePicker, ConfigCalendario, ConfMultiSelect, MultiSelect, UtilCalendario } from '../../util/global';
import { MonitorService, MonitorModel } from '../service/monitor.service';
import { CalendarEvent } from 'calendar-utils';
import { UtilService } from '../../util/service/util.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-monitor-ajustes',
  templateUrl: './monitor-ajustes.component.html',
  styleUrls: ['./monitor-ajustes.component.css']
})
export class MonitorAjustesComponent implements OnInit {

  monitor: MonitorModel;
  panelOpenState = false;
  menuAbierto = null;
  monitorCargado = false;
  msgs: Message[] = [];

  // Estaciones
  estaciones;
  etiquetasEstaciones: any;
  confSelEst: ConfMultiSelect;
  // Calendario
  configCalendario = new ConfigCalendario();
  datePickerInicio = new DatePicker();
  datePickerFin = new DatePicker();
  // Deportes
  etiquetasDeportes: any;
  selDeportes: ConfMultiSelect;

  constructor(private monitorService: MonitorService, private utilService:
    UtilService, private messageService: MessageService) {
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
      this.confSelEst = MultiSelect.iniMultiSelect('estación', 'estaciones');
    /* Calendario */
    this.configCalendario.vistas.headerRight = false;
    this.configCalendario.vistas.selectMonth = true;
    this.configCalendario = UtilCalendario.iniCalendario(this.configCalendario);

    /* Estacion */
    this.estaciones = this.utilService.estaciones.getValue();
    if (this.estaciones === null) {
      this.utilService.estaciones$.subscribe(estaciones => {
        this.confSelEst.dataModel = MultiSelect.iniDataModel(estaciones, 'Id', 'Name');
        this.inicio();
      });
    } else {
      this.confSelEst.dataModel = MultiSelect.iniDataModel(this.estaciones, 'Id', 'Name');
      this.inicio();
    }
  }

  inicio() {
    this.monitor = this.monitorService.monitor.getValue();
    if (this.monitor.Monitor === null) {
      this.monitorService.monitor$.subscribe(monitor => {
        this.monitor = monitor;
        this.reloadEvents();
        this.monitorEstaciones();
      });
    } else {
      this.reloadEvents();
      this.monitorEstaciones();
    }
  }

  ngOnInit() {
  }

  /* Calendario */
  reloadEvents() {
    this.configCalendario.events = UtilCalendario.iniEvents(this.monitor.FechasDisponibles, 'Disponible');
    this.configCalendario.trigger.next();
  }

  changeDatePicker(fecha, id) {
    if (id === 'inicio') {
      if (this.datePickerFin.date !== undefined) {
        this.addPeriodo();
      }
    } else // fin
      if (this.datePickerInicio.date !== undefined) {
        this.addPeriodo();
      }
  }
  addPeriodo() {
    let auxCalendar: CalendarEvent[];
    auxCalendar = [];
    let inicio = this.datePickerInicio.date;
    while (inicio < this.datePickerFin.date) {
      auxCalendar.push({
        start: inicio,
        allDay: true,
        title: 'Disponible',
        color: {
          primary: '#e3bc08',
          secondary: '#FDF1BA'
        }
      });
      inicio = new Date(inicio.setDate(inicio.getDate() + 1));
    }
    auxCalendar = auxCalendar.filter(val => {
      for (const evento of this.configCalendario.events) {
        if (evento.start.getTime() === val.start.getTime()) {
          return false;
        }
      }
      return true;
    });
    this.configCalendario.events = this.configCalendario.events.concat(auxCalendar);
    this.configCalendario.trigger.next();
  }
  viewDateChange($event) { }

  /* Estaciones */

  monitorEstaciones() {
    this.etiquetasEstaciones = [];
    for (const estacion of this.monitor.EstacionesDisponibles) {
      this.confSelEst.selectedModel.push(estacion.IdEstacion);
      this.etiquetasEstaciones.push(this.confSelEst.dataModel.find(x => x.id === estacion.IdEstacion));
    }
  }

  changeMultiselectEstaciones(evento) {
    this.etiquetasEstaciones = [];
    for (const id of this.confSelEst.selectedModel) {
      this.etiquetasEstaciones.push(this.confSelEst.dataModel.find(x => x.id === id));
    }
  }

  saveEstaciones() {
    this.monitor.EstacionesDisponibles = [];
    for (const idEstacion of this.confSelEst.selectedModel) {
      this.monitor.EstacionesDisponibles.push({
        IdEstacion: idEstacion,
        idMonitor: this.monitor.Monitor.Id,
        Id: 0
      });
    }
    this.monitorService.postMonitor(this.monitor, 'Estaciones',
      function (confirmacion, monitor) {
        this.msgs.push(confirmacion);
      }.bind(this));
  }

  saveCalendario() {
    this.monitor.FechasDisponibles = [];
    for (const evento of this.configCalendario.events) {
      this.monitor.FechasDisponibles.push({
        FechaEvento: new Date(evento.start),
        IdMonitor: this.monitor.Monitor.Id,
        Id: 0
      });
    }
    this.monitorService.postMonitor(this.monitor, 'Disponibles',
      function (confirmacion, monitor) {
        this.msgs.push(confirmacion);
      }.bind(this)
    );
  }

}
