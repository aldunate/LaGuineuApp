

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
import { UtilFechas } from '../../global';


@Component({
  selector: 'app-datatable-generic',
  templateUrl: './datatable-generic.component.html',
  styleUrls: ['./datatable-generic.component.css']
})
export class DatatableGenericComponent implements OnInit {

  @Output() clickTable = new EventEmitter<any>();
  @Input() dt: any;
  @Output() datos = new Subject();

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  constructor(private monitorService: MonitorService, private router: Router) {
  }

  inputChange(evento) {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dt.dtOptions.aaData = this.dt.dtDatos;
      for (const filtro of this.dt.dtFiltros) {
        if (filtro.type === 'text') {
          this.dt.dtOptions.aaData = this.dt.dtOptions.aaData.filter(x => {
            if (x[filtro.data] !== null) {
              return x[filtro.data].toLocaleLowerCase().includes(filtro.model.toLocaleLowerCase());
            }
          });
        }
        if (filtro.type === 'date') {
          this.dt.dtOptions.aaData = this.dt.dtOptions.aaData.filter(x => {
            if (x[filtro.data] !== null && filtro.model !== '') {
              const fecha = UtilFechas.espAdate(x[filtro.data]);
              const inputFecha = UtilFechas.espAdate(filtro.model);
              return UtilFechas.esMismoDia(fecha, inputFecha);
            }
            return true;
          });
        }
      }
      this.dt.dtTrigger.next();
    });
  }


  clickOnTable(event) {
    this.clickTable.emit(event);
  }
  ngOnInit() {
    this.dt.dtTrigger.subscribe(datos => {
      if (datos !== undefined) {
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dt.dtOptions.aaData = datos;
        });
      }
    });
  }

}


/*
Options
columnDefs
columns.cellType
columns.className
columns.contentPadding
columns.createdCell
columns.data
columns.defaultContent
columns.name
columns.orderable
columns.orderData
columns.orderDataType
columns.render
columns.searchable
columns.title
columns.type  https://datatables.net/reference/option/columns.type
columns.visible
columns.width

*/
