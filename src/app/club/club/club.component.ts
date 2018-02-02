import { Component, OnInit } from '@angular/core';
import { ClubService } from '../service/club.service';
import { MultiSelect } from '../../util/global';
import { ClienteService } from '../../cliente/service/cliente.service';
import { UtilService } from '../../util/service/util.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  Club = {
    Id: 0,
    Nombre: '',
    IdNivel: 0,
    IdEscuela: 0
  };
  clientesSelected = [];
  confMulti = {
    niveles: MultiSelect.iniSingleSelect('nivel', 'nivel'),
    clientes: MultiSelect.iniMultiSelect('cliente', 'clientes')
  };
  Clientes = [];
  errorMensaje = {
    general: ''
  };
  Niveles = [];

  constructor(private clubService: ClubService, private clienteService: ClienteService, private utilService: UtilService) {
    const idEscuela = 1; // Cambiar
    this.clienteService.getClientes(idEscuela, this.respGetClientes.bind(this));
    this.utilService.getNiveles(this.repGetNiveles.bind(this));
  }

  ngOnInit() {
  }
  repGetNiveles(niveles) {
    this.Niveles = niveles;
    this.confMulti.niveles.myOptions = MultiSelect.iniOptions(niveles, 'Id', 'Nombre');
  }
  respGetClientes(clientes) {
    this.Clientes = clientes;
    this.confMulti.clientes.myOptions = MultiSelect.iniOptions(clientes, 'Id', 'Nombre');
  }

  nombreChange(nombre) {
    const idEscuela = 1;
    this.clubService.existeNombre(idEscuela, nombre, this.respNombreChange.bind(this));
  }

  respNombreChange(resp) {

  }

  crearClub() {
    this.Club.IdNivel = this.confMulti.niveles.optionsModel[0];
    this.clubService.postClub(this.Club, this.clientesSelected, this.respCrearClub.bind(this));
  }

  respCrearClub() {

  }

}
