import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente, ClienteService, ClienteModel } from '../service/cliente.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { UtilService } from '../../util/service/util.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-cliente-nuevo',
  templateUrl: './cliente-nuevo.component.html',
  styleUrls: ['./cliente-nuevo.component.css']
})
export class ClienteNuevoComponent implements OnInit {

  correcto = false;
  cliente = new Cliente();
  clienteForm: FormGroup;
  usuario: string;
  msgs: Message[] = [];


  constructor(private http: HttpClient,
    private clienteSerivce: ClienteService,
    private utilService: UtilService,
    private router: Router, private fb: FormBuilder, private messageService: MessageService) {

    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });

    this.clienteForm = this.fb.group({
      nombre: new FormControl(''),
      apellidos: [''],
      email: ['', Validators.required && Validators.email],
      telefono: [''],
      fechaNacimiento: ''
    });

    this.clienteForm.get('nombre').valueChanges.forEach(
      (value: string) => {
        this.clienteForm.value.usuario = value + '.' + this.clienteForm.value.apellidos;
      }
    );
    this.clienteForm.get('apellidos').valueChanges.forEach(
      (value: string) => {
        this.clienteForm.value.usuario = this.clienteForm.value.nombre + '.' + value;
      }
    );
  }

  ngOnInit() {
  }

  get nombre() { return this.clienteForm.get('nombre'); }
  get apellidos() { return this.clienteForm.get('apellidos'); }
  get email() { return this.clienteForm.get('email'); }
  get telefono() { return this.clienteForm.get('telefono'); }


  nuevoCliente() {
    Object.keys(this.clienteForm.controls).forEach(field => { // {1}
      const control = this.clienteForm.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
    if (this.clienteForm.valid) {
      const cliente: ClienteModel = {
        Cliente: {
          Nombre: this.clienteForm.value.nombre,
          FechaNacimiento: this.clienteForm.value.fechaNacimiento,
          Apellidos: this.clienteForm.value.apellidos,
          Telefono: this.clienteForm.value.telefono
        },
        Usuario: {
          Email: this.clienteForm.value.email,
        },
        Operacion: 'Crear'
      };
      this.clienteSerivce.postCliente(cliente,
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
