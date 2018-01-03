
import { Component, OnInit, ChangeDetectorRef, KeyValueDiffers } from '@angular/core';
import { MonitorService } from '../service/monitor.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GlobalVar, UtilFechas, MultiSelect } from '../../util/global';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { FormControl } from '@angular/forms';



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
  auxEst: any;
  estacionesSelect = [];
  estLength = 0;
  confSelEst: any;
  viewDate = new Date();
  events = [];

  // personal
  cambios = false;
  titulacionList = [
    { id: 1, name: 'TD1' },
    { id: 2, name: 'TD2' },
    { id: 3, name: 'TD3' },
  ];
  differ: any;

  constructor(private monitorService: MonitorService,
    private router: Router, private route: ActivatedRoute) {
    this.iniMuro();
    this.iniCalendario();
    this.iniPersona();
    this.confSelEst = MultiSelect.iniMultiSelect('estación', 'estaciones');

  }


  ngOnInit() {
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

  /* MURO */
  iniMuro() { }


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
    this.estaciones = estaciones;
    this.confSelEst.myOptions = MultiSelect.iniOptions(this.estaciones, 'ID', 'Name');
  }


  onChangeEstaciones(estacion) {
    if (estacion.length > 0) {
      if (this.estLength < estacion.length) {
        // Add
        this.estacionesSelect.push(this.confSelEst.myOptions.find(auxEst => auxEst.id === estacion[estacion.length - 1]));
        this.estLength++;
      } else {
        // Delete
        const aux = [];
        for (let i = 0; i < estacion.length; i++) {
          aux.push(this.estacionesSelect.find(est => est.id === estacion[i]));
        }
        this.estacionesSelect = aux;
        this.estLength--;
      }
    } else {
      this.estacionesSelect = [];
    }
  }

  // PERSONAL
  iniPersona() { }

  personalCambios(evento) {
    this.cambios = true;
  }

}
