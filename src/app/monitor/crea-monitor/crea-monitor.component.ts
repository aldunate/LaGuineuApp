import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Output } from '@angular/core';
import { TokenService } from '../../usuario/service/token.service';
import { HttpClient } from '@angular/common/http';
import { MonitorService } from '../service/monitor.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// Material Angular
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material';
// import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import * as _moment from 'moment';
// const moment = _moment;



@Component({
  selector: 'app-crea-monitor',
  templateUrl: './crea-monitor.component.html',
  styleUrls: ['./crea-monitor.component.css']
})
export class CreaMonitorComponent implements OnInit {

  // Elementos referenciados
  @ViewChild(MatDatepicker)
  datepicker: MatDatepicker<Date>;

  monitor: any;
  usuario: any;
  nombre: string;
  apellidos: string;
  nacimiento: any;
  titulacion: any;

  titulacionList = [
    { id: 1, name: 'TD1' },
    { id: 2, name: 'TD2' },
    { id: 3, name: 'TD3' },
  ];

  constructor(private http: HttpClient, private tokenService: TokenService,
    private monitorService: MonitorService, private router: Router, public nacimientoEl: ElementRef) {
  }

  ngOnInit() {
    //  const x = $(this.nacimientoEl.nativeElement);
  }

  crearMonitor() {
    this.monitor = {
      'usuario': this.usuario,
      'nombre': this.nombre,
      'apellidos': this.apellidos,
      'nacimiento': this.nacimiento,
      'titulacion': this.titulacion
    };
    this.monitorService.crearMonitor(this.monitor, this.resCrearMonitor.bind(this));
  }

  resCrearMonitor(monitor) {
    this.monitor = monitor;
    this.router.navigate(['/editar-monitor/' + monitor.id]);
  }


}
