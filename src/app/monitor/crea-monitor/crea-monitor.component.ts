import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Output } from '@angular/core';
import { TokenService } from '../../usuario/service/token.service';
import { HttpClient } from '@angular/common/http';
import { MonitorService } from '../service/monitor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Material Angular
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material';
// import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Monitor } from '../../util/model/monitor';
// import * as _moment from 'moment';
// const moment = _moment;



@Component({
  selector: 'app-crea-monitor',
  templateUrl: './crea-monitor.component.html',
  styleUrls: ['./crea-monitor.component.css']
})
export class CreaMonitorComponent implements OnInit {

  Monitor: Monitor;

  constructor(private http: HttpClient, private tokenService: TokenService,
    private monitorService: MonitorService, private router: Router) {

  }

  ngOnInit() { }

  crearMonitor() {
    this.monitorService.crearMonitor(this.Monitor, this.resCrearMonitor.bind(this));
  }

  resCrearMonitor(id) {
    this.router.navigate(['/monitor/' + id]);
  }


}
