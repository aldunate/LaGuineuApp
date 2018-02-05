

import { Component, OnInit, ChangeDetectorRef, KeyValueDiffers, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarUtils } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { MonthView } from 'calendar-utils';
import { forEach } from '@angular/router/src/utils/collection';
import { MonitorService } from '../../../monitor/service/monitor.service';
import { DataTableDirective } from 'angular-datatables';

export class DataTable {
  columnas = [];
  filtros = [];
  dtDatos = [];
}

@Component({
  selector: 'app-datatable-generic',
  templateUrl: './datatable-generic.component.html',
  styleUrls: ['./datatable-generic.component.css']
})
export class DatatableGenericComponent implements OnInit {

  @Input() dt: DataTable = {
    columnas: [],
    dtDatos: [],
    filtros: []
  };

  defecto = {
    class: 'form-control'
  };

  tabla = {
    dtOptions: {
      aaData: [],
      data: [],
      pagingType: 'simple_numbers',
      pageLength: 10,
      language: {
        paginate: {
          next: 'Siguiente',
          previous: 'Anterior'
        }
      },
      lengthChange: false,
      bFilter: false
    },
    dtDatos: [],
    dtTrigger: new Subject(),
    columnas: []
  };

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  constructor(private monitorService: MonitorService) {
    this.monitorService.getMonitoresEscuela(1, this.respGetMonitoresEscuela.bind(this));
  }

  respGetMonitoresEscuela(monitores) {
    this.tabla.dtDatos = monitores;
    this.tabla.dtTrigger.next();
  }

  inputChange(evento) {
    const split = evento.srcElement.id.split('-');
    const type = split[0];
    const id = split[1];
    const value = evento.srcElement.value;
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.tabla.dtOptions.aaData = this.dt.dtDatos.filter(x =>
        x[id].toLocaleLowerCase().includes(value.toLocaleLowerCase()));
      this.tabla.dtTrigger.next();
    });
  }

  ngOnInit() {
    for (let i = 0; i < this.dt.filtros.length; i++) {
      if (this.dt.filtros[i].class === undefined) {
        this.dt.filtros[i].class = this.defecto.class;
      }
    }
  }

}
