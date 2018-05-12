import { Component, OnInit } from '@angular/core';
import { ConfigCalendario, UtilCalendario } from '../../util/global';

@Component({
  selector: 'app-clase-asignar',
  templateUrl: './clase-asignar.component.html',
  styleUrls: ['./clase-asignar.component.css']
})
export class ClaseAsignarComponent implements OnInit {

  // Calendario
  configCalendario = new ConfigCalendario();

  constructor() {
    /* Calendario */
    this.configCalendario.vistas.headerRight = false;
    this.configCalendario.vistas.selectMonth = true;
    this.configCalendario.view = 'day';
    this.configCalendario = UtilCalendario.iniCalendario(this.configCalendario);
  }

  ngOnInit() {
  }

}
