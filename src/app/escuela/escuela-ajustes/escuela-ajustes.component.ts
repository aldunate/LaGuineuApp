import { Component, OnInit, Input } from '@angular/core';
import { EscuelaService } from '../service/escuela.service';
import { ConfMultiSelect, ConfigCalendario, DatePicker, MultiSelect, UtilCalendario } from '../../util/global';
import { UtilService } from '../../util/service/util.service';
import { CalendarEvent } from 'calendar-utils';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/api';
import { EscuelaModel } from '../../models/escuela.model';

@Component({
  selector: 'app-escuela-ajustes',
  templateUrl: './escuela-ajustes.component.html',
  styleUrls: ['./escuela-ajustes.component.css']
})
export class EscuelaAjustesComponent {

  msgs: Message[] = [];
  escuela: EscuelaModel;
  escuelaCargada = false;
  otrosCargado = false;
  panelOpenState = false;
  menuAbierto = null;

  // Estaciones
  estaciones;
  etiquetasEstaciones: any;
  selEstacion: ConfMultiSelect;
  // Calendario
  configCalendario = new ConfigCalendario();
  datePickerInicio = new DatePicker();
  datePickerFin = new DatePicker();
  // Deportes
  deportes;
  etiquetasDeportes: any;
  selDeportes: ConfMultiSelect;

  constructor(private escuelaService: EscuelaService, private utilService: UtilService, private messageService: MessageService) {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });

    this.selEstacion = MultiSelect.iniMultiSelect('estación', 'estaciones');
    this.selDeportes = MultiSelect.iniMultiSelect('deporte', 'deportes');

    /* Calendario */
    this.configCalendario.vistas.headerRight = false;
    this.configCalendario.vistas.selectMonth = true;
    this.configCalendario = UtilCalendario.iniCalendario(this.configCalendario);

    // Estacion
    this.estaciones = this.utilService.estaciones.getValue();
    if (this.estaciones === null) {
      this.utilService.estaciones$.subscribe(estaciones => {
        if (estaciones !== null) {
          this.estaciones = estaciones;
          this.selEstacion.cargado = true;
          this.selEstacion.dataModel = MultiSelect.iniDataModel(this.estaciones, 'Id', 'Name');
          this.estanCargados();
        }
      });
    } else {
      this.selEstacion.cargado = true;
    }

    /* Deportes */
    this.deportes = this.utilService.deportes.getValue();
    if (this.deportes === null) {
      this.utilService.deportes$.subscribe(deportes => {
        if (deportes !== null) {
          this.deportes = deportes;
          this.selDeportes.cargado = true;
          this.selDeportes.dataModel = MultiSelect.iniDataModel(this.deportes, 'Id', 'Nombre');
          this.estanCargados();
        }
      });
    } else {
      this.selDeportes.cargado = true;
      this.selDeportes.dataModel = MultiSelect.iniDataModel(this.deportes, 'Id', 'Nombre');
      this.estanCargados();
    }

  }
  estanCargados() {
    if (this.selDeportes.cargado && this.selEstacion.cargado) {
      this.inicio();
    }
  }
  inicio() {
    this.escuelaService.escuela$.subscribe(escuela => {
      if (escuela !== null && !this.escuelaCargada) {
        this.escuela = escuela;
        this.escuelaCargada = true;
        this.actualizaEscuela();
      }
    });
  }



  actualizaEscuela() {
    /* Calendario */
    this.configCalendario.events = UtilCalendario.iniEvents(this.escuela.FechasDisponibles, 'Disponible');
    this.configCalendario.trigger.next();

    /* Estaciones */
    this.etiquetasEstaciones = [];
    for (const estacion of this.escuela.EstacionesDisponibles) {
      this.selEstacion.selectedModel.push(estacion.Id);
    }
    this.etiquetasEstaciones = this.escuela.EstacionesDisponibles;

    /* Deportes */
    this.etiquetasDeportes = [];
    for (const deporte of this.escuela.DeportesDisponibles) {
      this.selDeportes.selectedModel.push(deporte.IdDeporte);
      this.etiquetasDeportes.push(this.selDeportes.dataModel.find(x => x.id === deporte.IdDeporte));
    }
  }

  /*
    Calendario
  */

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


  saveDisponibles() {
    this.escuela.Operacion = 'Disponibles';
    this.escuela.FechasDisponibles = [];
    for (const evento of this.configCalendario.events) {
      this.escuela.FechasDisponibles.push({
        FechaEvento: new Date(evento.start),
        IdEscuela: this.escuela.Escuela.Id,
        Id: 0
      });
    }
    this.escuelaService.postEscuela(this.escuela,
      function (confirmacion) {
        this.msgs.push(confirmacion);
      }.bind(this));
  }

  /*
    Estacion
  */
  changeMultiselectEstaciones(evento) {
    this.etiquetasEstaciones = [];
    for (const id of this.selEstacion.selectedModel) {
      const e = this.selEstacion.dataModel.find(x => x.id === id);
      this.etiquetasEstaciones.push({ Id: e.id, Nombre: e.name });
    }
  }

  saveEstaciones() {
    this.escuela.Operacion = 'Estaciones';
    this.escuela.EstacionesDisponibles = [];
    for (const idEstacion of this.selEstacion.selectedModel) {
      this.escuela.EstacionesDisponibles.push({
        IdEstacion: idEstacion,
        idEscuela: this.escuela.Escuela.Id,
        Id: 0
      });
    }
    this.escuelaService.postEscuela(this.escuela,
      function (confirmacion) {
        this.msgs.push(confirmacion);
      }.bind(this));
  }
  /*
     Deportes
  */

  changeMultiselectDeportes(evento) {
    this.etiquetasDeportes = [];
    for (const id of this.selDeportes.selectedModel) {
      this.etiquetasDeportes.push(this.selDeportes.dataModel.find(x => x.id === id));
    }
  }

  saveDeportes() {
    this.escuela.Operacion = 'Deportes';
    this.escuela.DeportesDisponibles = [];
    for (const idDeporte of this.selDeportes.selectedModel) {
      this.escuela.DeportesDisponibles.push({
        IdDeporte: idDeporte,
        idEscuela: this.escuela.Escuela.Id,
        Id: 0
      });
    }
    this.escuelaService.postEscuela(this.escuela,
      function (confirmacion) {
        this.msgs.push(confirmacion);
      }.bind(this));
  }

}
