import { Component, OnInit } from '@angular/core';
import { MultiSelect } from '../../util/global';
import { EstacionService } from '../../estacion/service/estacion.service';
import { MonitorService } from '../../monitor/service/monitor.service';

@Component({
  selector: 'app-nueva-clase',
  templateUrl: './nueva-clase.component.html',
  styleUrls: ['./nueva-clase.component.css']
})
export class NuevaClaseComponent implements OnInit {

  Clase = {

  };
  Clases: any;
  confSelEst: any;
  boton = {
    cliente : {
      ver: false,
      texto: 'Añadir cliente',
      class: 'btn btn-success'
    },
    club: {
      ver: false,
      texto: 'Añadir club',
      class: 'btn btn-success'
    }
  };

  Estaciones = [];
  estacionesSelect = [];

  constructor(private estacionService: EstacionService, private monitorSerivce: MonitorService) {
    this.confSelEst = MultiSelect.iniMultiSelect('estación', 'estaciones');
    this.confSelEst.mySettings.selectionLimit = 1;
    this.confSelEst.mySettings.autoUnselect = true;
    this.estacionService.getEstaciones(this.respGetEstaciones.bind(this));
  }

  ngOnInit() {
  }

  openCliente($event) {
    if (!this.boton.cliente.ver) {
      this.boton.cliente = {
        ver: true,
        texto: 'Cerrar cliente',
        class: 'btn'
      };
    }else {
      this.boton. cliente = {
        ver: false,
        texto: 'Añadir cliente',
        class: 'btn btn-success'
      };

    }
  }

  openClub($event) {
    if (!this.boton.club.ver) {
      this.boton.club = {
        ver: true,
        texto: 'Cerrar club',
        class: 'btn'
      };
    }else {
      this.boton.club = {
        ver: false,
        texto: 'Añadir club',
        class: 'btn btn-success'
      };
    }
  }

  respGetEstaciones(estaciones) {
    this.Estaciones = estaciones;
    this.confSelEst.myOptions = MultiSelect.iniOptions(this.Estaciones, 'Id', 'Name');
  }

  onChangeEstaciones(estacion) {

  }


}
