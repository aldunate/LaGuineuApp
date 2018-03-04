import { Component, OnInit } from '@angular/core';
import { EscuelaModel, EscuelaService } from '../service/escuela.service';
import { ConfMultiSelect, ConfigCalendario, DatePicker, MultiSelect, UtilCalendario } from '../../util/global';
import { UtilService } from '../../util/service/util.service';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'app-escuela-ajustes',
  templateUrl: './escuela-ajustes.component.html',
  styleUrls: ['./escuela-ajustes.component.css']
})
export class EscuelaAjustesComponent implements OnInit {

  escuela: EscuelaModel;
  // Estaciones
  menuAbierto = null;
  etiquetas: any;
  selEstacion: ConfMultiSelect;
  panelOpenState = false;
  // Calendario
  configCalendario = new ConfigCalendario();
  datePickerInicio = new DatePicker();
  datePickerFin = new DatePicker();

  constructor(private escuelaService: EscuelaService, private utilService: UtilService) {
    this.selEstacion = MultiSelect.iniMultiSelect('estación', 'estaciones');
    if (this.escuelaService._escuela.Escuela !== undefined) {
      this.escuela = this.escuelaService._escuela;
    } else {
      this.escuelaService.escuela$.subscribe(escuela => {
        this.escuela = escuela;
        this.iniCalendario();
      });
    }
  }

  ngOnInit() {
  }

  /* Calendario */
  iniCalendario() {
    this.configCalendario.vistas.headerRight = false;
    this.configCalendario.vistas.selectMonth = true;
    this.configCalendario = UtilCalendario.iniCalendario(this.configCalendario);
    this.configCalendario.events = UtilCalendario.iniEvents(this.escuela.FechasDisponibles, 'Disponible');
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
    this.utilService.estaciones$.subscribe(estaciones => {
      if (estaciones !== null) {
        this.selEstacion.dataModel = MultiSelect.iniDataModel(estaciones, 'Id', 'Name');
        this.etiquetas = [];
        for (const estacion of this.escuela.EstacionesDisponibles) {
          this.selEstacion.selectedModel.push(estacion.IdEstacion);
          this.etiquetas.push(this.selEstacion.dataModel.find(x => x.id === estacion.IdEstacion));
        }
      }
    }).unsubscribe();
  }

  changeMultiselect(evento) {
    this.etiquetas = [];
    for (const id of this.selEstacion.selectedModel) {
      this.etiquetas.push(this.selEstacion.dataModel.find(x => x.id === id));
    }
  }

  saveCalendario() {
    this.escuela.FechasDisponibles = [];
    this.escuela.EstacionesDisponibles = [];
    for (const idEstacion of this.selEstacion.selectedModel) {
      this.escuela.EstacionesDisponibles.push({
        IdEstacion: idEstacion,
        idEscuela: this.escuela.Escuela.Id,
        Id: 0
      });
    }
    for (const evento of this.configCalendario.events) {
      this.escuela.FechasDisponibles.push({
        FechaEvento: new Date(evento.start),
        IdEscuela: this.escuela.Escuela.Id,
        Id: 0
      });
    }
    this.escuelaService.postEscuela(this.escuela);
  }

}
