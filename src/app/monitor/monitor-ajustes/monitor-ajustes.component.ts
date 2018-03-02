import { Component, OnInit, Input } from '@angular/core';
import { DatePicker, ConfigCalendario, ConfMultiSelect, MultiSelect, UtilCalendario } from '../../util/global';
import { MonitorService, MonitorModel } from '../service/monitor.service';
import { EstacionService } from '../../estacion/service/estacion.service';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'app-monitor-ajustes',
  templateUrl: './monitor-ajustes.component.html',
  styleUrls: ['./monitor-ajustes.component.css']
})
export class MonitorAjustesComponent implements OnInit {

  monitor: MonitorModel;

  // Estaciones
  menuAbierto = null;
  etiquetas: any;
  confSelEst: ConfMultiSelect;
  panelOpenState = false;
  // Calendario
  configCalendario = new ConfigCalendario();
  datePickerInicio = new DatePicker();
  datePickerFin = new DatePicker();

  constructor(private monitorService: MonitorService, private estacionService: EstacionService, ) {
    this.confSelEst = MultiSelect.iniMultiSelect('estación', 'estaciones');
    this.monitorService.monitor$.subscribe(monitor => {
      this.monitor = monitor;
      this.iniCalendario();
    });
  }

  ngOnInit() {
  }

  /* Calendario */
  iniCalendario() {
    this.configCalendario.vistas.headerRight = false;
    this.configCalendario.vistas.selectMonth = true;
    this.configCalendario = UtilCalendario.iniCalendario(this.configCalendario);
    this.configCalendario.events = UtilCalendario.iniEvents(this.monitor.FechasDisponibles, 'Disponible');
    this.configCalendario.trigger.next();
    this.iniSelectedEstacion();
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

  iniSelectedEstacion() {
    this.estacionService.getEstaciones(
      function (estaciones) {
        this.confSelEst.dataModel = MultiSelect.iniDataModel(estaciones, 'Id', 'Name');
        this.etiquetas = [];
        for (const estacion of this.monitor.EstacionesDisponibles) {
          this.confSelEst.selectedModel.push(estacion.IdEstacion);
          this.etiquetas.push(this.confSelEst.dataModel.find(x => x.id === estacion.IdEstacion));
        }
      }.bind(this)
    );
  }

  changeMultiselect(evento) {
    this.etiquetas = [];
    for (const id of this.confSelEst.selectedModel) {
      this.etiquetas.push(this.confSelEst.dataModel.find(x => x.id === id));
    }
  }

  saveCalendario() {
    this.monitor.FechasDisponibles = [];
    this.monitor.EstacionesDisponibles = [];
    for (const idEstacion of this.confSelEst.selectedModel) {
      this.monitor.EstacionesDisponibles.push({
        IdEstacion: idEstacion,
        idMonitor: this.monitor.Monitor.Id,
        Id: 0
      });
    }
    for (const evento of this.configCalendario.events) {
      this.monitor.FechasDisponibles.push({
        FechaEvento: new Date(evento.start),
        IdMonitor: this.monitor.Monitor.Id,
        Id: 0
      });
    }
    this.monitorService.saveCalendario(this.monitor,
      function (eventos) {

      }.bind(this)
    );
  }

}
