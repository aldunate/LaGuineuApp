import { Component, OnInit } from '@angular/core';
import { Clase, ClaseService } from '../service/clase.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfMultiSelect, MultiSelect, DatePicker, ConfigCalendario, UtilCalendario } from '../../util/global';
import { HttpClient } from '@angular/common/http';
import { MonitorService } from '../../monitor/service/monitor.service';
import { UtilService } from '../../util/service/util.service';
import { Router } from '@angular/router';
import { EscuelaService, Escuela } from '../../escuela/service/escuela.service';
import { duration } from 'moment';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-clase-nueva',
  templateUrl: './clase-nueva.component.html',
  styleUrls: ['./clase-nueva.component.css']
})
export class ClaseNuevaComponent implements OnInit {

  correcto = false;
  clase = new Clase();
  msgs: Message[] = [];



  // Multiselects
  confMulti = {
    niveles: MultiSelect.iniMultiSelect('nivel', 'niveles',
      { selectionLimit: 1, enableSearch: false }),
    estaciones: MultiSelect.iniMultiSelect('estacion', 'estacion',
      { selectionLimit: 1, enableSearch: false }),
    edades: MultiSelect.iniMultiSelect('edades', 'edades',
      { selectionLimit: 1, enableSearch: false })
  };

  constructor(private claseService: ClaseService, private escuelaService: EscuelaService,
    private utilService: UtilService, private messageService: MessageService,
    private router: Router) {

    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    /* Estacion */
    this.escuelaService.escuela$.subscribe(
      escuela => {
        if (escuela !== null) {
          this.confMulti.estaciones.dataModel = MultiSelect.iniDataModel(escuela.EstacionesDisponibles, 'Id', 'Nombre');
        }
      }
    );
    // Niveles
    this.utilService.niveles.subscribe(niveles => {
      this.confMulti.niveles.dataModel = niveles ? MultiSelect.iniDataModel(niveles, 'Id', 'Nombre') : [];
    });
    // Edades
    this.confMulti.edades.dataModel = MultiSelect.iniDataModel(this.utilService.edades, 'Id', 'Nombre');

  }

  ngOnInit() {
  }


  crearClase() {
    const clase: Clase = {
      Id: 0,
      Personas: this.clase.Personas,
      Nombre: this.clase.Nombre,
      Fecha: this.clase.Fecha,
      Duracion: this.clase.Duracion,
      HoraInicio: this.clase.HoraInicio,
      HoraFin: this.clase.HoraFin,
    };
    if (this.confMulti.estaciones.selectedModel.length > 0) {
      clase.IdEstacion = Number.parseInt(this.confMulti.estaciones.selectedModel[0] + '');
    }
    if (this.confMulti.niveles.selectedModel.length > 0) {
      clase.IdNivel = Number.parseInt(this.confMulti.niveles.selectedModel[0] + '');
    }
    if (this.confMulti.edades.selectedModel.length > 0) {
      clase.IdEdades = Number.parseInt(this.confMulti.edades.selectedModel[0] + '');
    }
    this.claseService.postClase(clase,
      function (confirmacion, id) {
        this.msgs.push(confirmacion);
      }.bind(this));
  }

  btnVolver() {
    this.router.navigate(['/clases']);
  }

}
