

import { Component, OnInit, ChangeDetectorRef, KeyValueDiffers, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GlobalVar, UtilFechas, MultiSelect } from '../../util/global';
import { FormControl } from '@angular/forms';

import { ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarUtils } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { MonthView } from 'calendar-utils';
import { EscuelaService } from '../service/escuela.service';
import { MonitorService } from '../../monitor/service/monitor.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Monitor } from '../../util/model/monitor';


@Component({
  selector: 'app-gestion-escuela',
  templateUrl: './gestion-escuela.component.html',
  styleUrls: ['./gestion-escuela.component.css']
})
export class GestionEscuelaComponent implements OnInit {

  Escuela = {
    Id: 0,
    Nombre: '',
    Direccion: '',
    Telefono: '',
    Email: '',
    FotoPerfil: ''
  };

  Monitores: any;
  imgConf = {
    src: '../../../assets/img/sinPerfil-660x660.png',
    class: 'image img-rounded img-responsive img200x200',
    style: ''
  };

  tablas = {
    monitores: {
      dtOptions: {
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
      columnas: [{ title: 'Nombre', dato: 'Nombre' },
      { title: 'Apellidos', dato: 'Apellidos' },
      { title: 'Fecha Nacimiento', dato: 'FechaNacimiento' }
      ],
      filtros: [{ model: '', id: 'txt-Nombre' , type: 'text', placeholder: 'Buscar ' }]
    }
  };

  dtOptions: DataTables.Settings = {};
  dtSearch: DataTables.SearchSettings = {};

  constructor(private escuelaService: EscuelaService,
    private monitorService: MonitorService,
    private router: Router, private route: ActivatedRoute) {
    const aux = this.router.url.split('/');
    const idEscuela = Number.parseInt(aux[aux.length - 1]);
    this.escuelaService.getEscuela(idEscuela, this.respGetEscuela.bind(this));
    this.monitorService.getMonitoresEscuela(idEscuela, this.respGetMonitoresEscuela.bind(this));
  }

  ngOnInit() {
  }

  respGetEscuela(escuela) {
    this.Escuela = escuela;
    if (this.Escuela.FotoPerfil !== undefined) {
      this.imgConf.src = '../../../assets/img/perfiles/' + this.Escuela.FotoPerfil;
    }
  }

  respGetMonitoresEscuela(monitores) {
    this.tablas.monitores.dtDatos = monitores;
    this.tablas.monitores.dtTrigger.next();
  }

  irMonitor(idMonitor) {
    this.router.navigate(['/monitor/' + idMonitor]);
  }
  // Pestañas
  /* MURO */


}
