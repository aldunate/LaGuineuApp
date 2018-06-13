import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ClubService, Club, ClubModel } from '../service/club.service';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/api';
import { UtilService } from '../../util/service/util.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { MultiSelect } from '../../util/global';
import { ClienteService, Cliente } from '../../cliente/service/cliente.service';

@Component({
  selector: 'app-club-nuevo',
  templateUrl: './club-nuevo.component.html',
  styleUrls: ['./club-nuevo.component.css']
})
export class ClubNuevoComponent implements OnInit {

  club = new Club();
  clubForm: FormGroup;
  msgs: Message[] = [];
  confMulti = {
    clientes: MultiSelect.iniMultiSelect('cliente', 'clientes')
  };
  idClub: number;
  txtBtnGuardar = 'Crear club';


  constructor(private http: HttpClient, private clubService: ClubService, private utilService: UtilService,
    private router: Router, private fb: FormBuilder, private messageService: MessageService,
    private clienteService: ClienteService) {

    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });

    const aux = this.router.url.split('/');
    this.idClub = Number.parseInt(aux[aux.length - 1]);
    this.clubForm = this.fb.group({
      nombre: ['', Validators.required],
    });

    this.clienteService.getClientesEscuela(
      function (clientes) {
        this.confMulti.clientes.dataModel = MultiSelect.iniDataModel(clientes, 'Id', 'Nombre');
        if (!isNaN(this.idClub)) {

          this.clubService.getGlub(this.idClub,
            function (club) {
              this.club = club.Club;
              this.clubForm = this.fb.group({
                nombre: [this.club.Nombre, Validators.required],
              });
              club.Clientes.forEach(element => {
                this.confMulti.clientes.selectedModel.push(element.IdCliente);
              });
              this.utilService.setTextoSuperior({
                titulo: 'Club ' + club.Club.Nombre,
                href: 'club/' + club.Club.Id
              });
              this.txtBtnGuardar = 'Modificar club';
            }.bind(this));
        }
      }.bind(this)
    );
  }

  ngOnInit() {
  }

  get nombre() { return this.clubForm.get('nombre'); }


  nuevoCliente() {
    Object.keys(this.clubForm.controls).forEach(field => { // {1}
      const control = this.clubForm.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
    if (this.clubForm.valid) {
      let aux = 'Crear';
      let id = 0;
      if (!isNaN(this.idClub)) {
        aux = 'Editar';
        id = this.idClub;
      }
      const c = new Array<Cliente>();
      this.confMulti.clientes.selectedModel.forEach(idCliente => {
        c.push({
          Id: Number.parseInt(idCliente.toString())
        });
      });
      const club: ClubModel = {
        Club: {
          Id: id,
          Nombre: this.clubForm.value.nombre.toString(),
        },
        Clientes: c,
        Operacion: aux
      };
      this.clubService.postClub(club,
        function (confirmacion, idCliente) {
          this.msgs.push(confirmacion);
          this.router.navigate(['/clubes']);
        }.bind(this));
    }
  }

  btnVolver() {
    this.router.navigate(['/clubes']);
  }

}


