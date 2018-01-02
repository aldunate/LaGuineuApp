
import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../service/monitor.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GlobalVar, UtilFechas } from '../../util/global';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';



@Component({
  selector: 'app-editar-monitor',
  templateUrl: './editar-monitor.component.html',
  styleUrls: ['./editar-monitor.component.css']
})
export class EditarMonitorComponent implements OnInit {

  monitor: any;
  imgConf = {
    src: '../../../assets/img/sinPerfil-660x660.png',
    class: 'image img-rounded img-responsive',
    style: ''
  };


  // CALENDARIO
  estaciones: any;
  estacionesEscogidas = [''];
  estacionesSelect: any;

  filteredOptions: Observable<string[]>;

  // personal
  cambios = false;
  titulacionList = [
    { id: 1, name: 'TD1' },
    { id: 2, name: 'TD2' },
    { id: 3, name: 'TD3' },
  ];


  constructor(private monitorService: MonitorService,
    private router: Router, private route: ActivatedRoute) {
    this.iniMuro();
    this.iniCalendario();
    this.iniPersona();
  }

  ngOnInit() {
  }

  filter(val: string): string[] {
    return this.estacionesEscogidas.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  respGetMonitor(monitor) {
    monitor.titulo = '';
    for (let i = 0; i < monitor.titulos.length; i++) {
      monitor.titulo += ' ' + monitor.titulos[i];
    }
    this.monitor = monitor;
    this.monitor.edad = UtilFechas.calculaEdad(monitor.nacimiento);
    this.monitor.edad += ' años';
    this.imgConf.src = monitor.imagePerfil;
  }

  // Pestañas

  /* muro */
  iniMuro() {

  }


  /* Calendario */

  iniCalendario() {
    this.monitorService.getEstaciones(this.respGetEstaciones.bind(this));
    if (this.monitorService.monitor !== undefined) {
      this.monitor = this.monitorService.monitor;
      this.imgConf.src = this.monitor.imagePerfil;
    } else {
      const id = this.router.url.split('/');
      this.monitor = {
        id: id[id.length - 1]
      };
      this.monitorService.getMonitor(this.monitor, this.respGetMonitor.bind(this));
    }
  }

  respGetEstaciones(estaciones) {
    this.estacionesSelect = [];
    for (let i = 0; i < estaciones.length; i++) {
      this.estacionesSelect.push(estaciones[i].Name);
    }
    this.estaciones = estaciones;
    /*this.estacionesSelect = this.estacionesEscogidas.values[0]
    .pipe(startWith(''), map(val => this.filter(this.estacionesSelect[0]))
    );*/
  }
  onChangeEstaciones(evento) {
    const s = evento;
  }

  // PERSONAL

  iniPersona() {

  }

  personalCambios(evento) {
    this.cambios = true;
  }


}
