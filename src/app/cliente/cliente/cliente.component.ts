import { Component, OnInit } from '@angular/core';
import { MultiSelect } from '../../util/global';
import { ClubService } from '../../club/service/club.service';
import { ClienteService } from '../service/cliente.service';
import { UtilService } from '../../util/service/util.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  Cliente = {
    Id: 0,
    Nombre: '',
    Apellidos: '',
    Email: '',
    Telefono: '',
    FechaNacimiento: '',
    IdNivel: 0,
    IdClub: 0
  };
  Niveles = [];
  Deportes = [];
  confMulti = {
    niveles: MultiSelect.iniSingleSelect('nivel', false),
    clubs: MultiSelect.iniSingleSelect('club', false),
    deportes: MultiSelect.iniSingleSelect('deporte', false),
  };

  Clubs = [];
  errorMensaje = {
    general: ''
  };

  table = {
    opciones: {
      columnas: [
        { id: 'Uno', titulo: 'Uno' }
      ]
    },
    datos: [{
      Uno: 1
    }]
  };
  m: 'mamama';

  constructor(private clubService: ClubService, private clienteService: ClienteService, private utilService: UtilService) {
    const idEscuela = 1;  // cambiar
    this.clubService.getClubs(idEscuela, this.respGetClubs.bind(this));
    this.utilService.getNiveles(this.repGetNiveles.bind(this));
    this.utilService.getDeportesEscuela(idEscuela, this.respGetDeportes.bind(this));
  }

  ngOnInit() {
  }

  respGetDeportes(deportes) {
    this.Deportes = deportes;
    this.confMulti.deportes.myOptions = MultiSelect.iniDataModel(deportes, 'Id', 'Nombre');
  }

  repGetNiveles(niveles) {
    this.Niveles = niveles;
    this.confMulti.niveles.myOptions = MultiSelect.iniDataModel(niveles, 'Id', 'Nombre');
  }
  respGetClubs(clubs) {
    this.Clubs = clubs;
    this.confMulti.clubs.myOptions = MultiSelect.iniDataModel(clubs, 'Id', 'Nombre');
  }


  crearCliente() {
    if (this.Cliente.Nombre !== '') {
      this.errorMensaje.general += 'El nombre es obligatorio';
    }
    if (this.Cliente.Apellidos !== '') {
      this.errorMensaje.general += 'Los apellidos son obligatorios';
    }
    if (this.errorMensaje.general === '') {
      this.Cliente.IdNivel = this.confMulti.niveles.optionsModel[0];
      this.Cliente.IdClub = this.confMulti.clubs.optionsModel[0];
      this.clienteService.postCliente(this.Cliente, this.respCrearCliente.bind(this));
    } else {
      this.errorMensaje.general = '';
    }
  }
  respCrearCliente(cliente) {

  }

}
