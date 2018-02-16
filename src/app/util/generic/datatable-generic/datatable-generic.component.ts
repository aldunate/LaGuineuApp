

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

  tabla = {
    dtOptions: {
      pagingType: 'full_numbers',
      pageLength: 10,
      aaData: [],
      data: [],
      columns: [],
      language:
        {
          sProcessing: 'Procesando...',
          sLengthMenu: 'Mostrar _MENU_ registros',
          sZeroRecords: 'No se encontraron resultados',
          sEmptyTable: 'Ningún dato disponible en esta tabla',
          sInfo: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
          sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
          sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
          sInfoPostFix: '',
          sSearch: 'Buscar:',
          sUrl: '',
          sInfoThousands: ',',
          sLoadingRecords: 'Cargando...',
          oPaginate: {
            sFirst: 'Primero',
            sLast: 'Último',
            sNext: 'Siguiente',
            sPrevious: 'Anterior'
          },
          oAria: {
            sSortAscending: ': Activar para ordenar la columna de manera ascendente',
            sSortDescending: ': Activar para ordenar la columna de manera descendente'
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
    this.tabla.dtOptions.data = monitores;
    this.tabla.dtOptions.aaData = monitores;
    // this.tabla.dtOptions.mData = monitores;
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
    this.tabla.dtOptions.columns = this.dt.columnas;
  }

}
