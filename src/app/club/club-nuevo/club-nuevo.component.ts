import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ClubService, Club, ClubModel } from '../service/club.service';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/api';
import { UtilService } from '../../util/service/util.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { MultiSelect } from '../../util/global';
import { ClienteService } from '../../cliente/service/cliente.service';

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


  constructor(private http: HttpClient, private clubService: ClubService, private utilService: UtilService,
    private router: Router, private fb: FormBuilder, private messageService: MessageService,
    private clienteService: ClienteService) {

    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    this.clubForm = this.fb.group({
      nombre: ['', Validators.required],
    });

    this.clienteService.getClientesEscuela(
      function (clientes) {
        this.confMulti.clientes.dataModel = MultiSelect.iniDataModel(clientes, 'Id', 'Nombre');
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
      const c = [];
      this.confMulti.clientes.selectedModel.forEach(idCliente => {
        c.push({
          IdCliente: idCliente
        });
      });
      const club: ClubModel = {
        Club: {
          Nombre: this.clubForm.value.nombre.toString(),
        },
        Clientes: c,
        Operacion: 'Crear'
      };
      this.clubService.postClub(club,
        function (confirmacion, idCliente) {
          this.msgs.push(confirmacion);
          this.router.navigate(['/cliente/' + idCliente]);
        }.bind(this));
    }
  }

  btnVolver() {
    this.router.navigate(['/clientes']);
  }

}


