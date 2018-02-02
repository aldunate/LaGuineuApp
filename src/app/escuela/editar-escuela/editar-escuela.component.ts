

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


@Component({
  selector: 'app-editar-escuela',
  templateUrl: './editar-escuela.component.html',
  styleUrls: ['./editar-escuela.component.css']
})
export class EditarEscuelaComponent implements OnInit {

  Escuela = {
    Id: 0,
    Nombre: '',
    Direccion: '',
    Telefono: '',
    Email: '',
    FotoPerfil: ''
  };

  imgConf = {
    src: '../../../assets/img/sinPerfil-660x660.png',
    class: 'image img-rounded img-responsive img200x200',
    style: ''
  };


  constructor(private escuelaService: EscuelaService,
    private router: Router, private route: ActivatedRoute) {
      const aux = this.router.url.split('/');
      const idEscuela = Number.parseInt(aux[aux.length - 1]);

    this.escuelaService.getEscuela( idEscuela, this.respGetEscuela.bind(this));
  }

  ngOnInit() {
  }

  respGetEscuela(escuela) {
    this.Escuela = escuela;
    if (this.Escuela.FotoPerfil !== undefined) {
      this.imgConf.src = '../../../assets/img/perfiles/' + this.Escuela.FotoPerfil;
    }
  }

  // Pestañas
  /* MURO */


}
