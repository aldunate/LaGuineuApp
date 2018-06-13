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
  idCliente: number;
  txtBtnGuardar = 'Crear cliente';
  existeEmail = false;

  constructor(private http: HttpClient,
    private clienteSerivce: ClienteService,
    private utilService: UtilService,
    private router: Router, private fb: FormBuilder, private messageService: MessageService) {

    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    const aux = this.router.url.split('/');
    this.idCliente = Number.parseInt(aux[aux.length - 1]);

    if (!isNaN(this.idCliente)) {
      this.clienteSerivce.getCliente(this.idCliente, function (cliente) {
        this.setCliente(cliente);
      }.bind(this));
    }
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


  setCliente(cliente) {
    // 1986-08-29T00:00:00" does not conform to the required format, "yyyy-MM-dd".
    this.utilService.setTextoSuperior({
      titulo: 'Cliente ' + cliente.Nombre + ' ' + cliente.Apellidos,
      href: 'cliente/' + cliente.Id
    });
    this.txtBtnGuardar = 'Modificar cliente';

    const aux = (cliente.FechaNacimiento.split('T')[0]).split('-');
    cliente.FechaNacimiento = aux[0] + '-' + aux[1] + '-' + aux[2];
    this.clienteForm = this.fb.group({
      nombre: new FormControl(cliente.Nombre),
      apellidos: [cliente.Apellidos],
      email: [cliente.Email, Validators.required && Validators.email],
      telefono: [cliente.Telefono],
      fechaNacimiento: cliente.FechaNacimiento
    });
  }

  nuevoCliente() {
    Object.keys(this.clienteForm.controls).forEach(field => { // {1}
      const control = this.clienteForm.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
    if (this.clienteForm.valid) {
      let aux;
      let auxId;
      if (isNaN(this.idCliente)) {
        aux = 'Crear';
        auxId = 0;
      } else {
        aux = 'Editar';
        auxId = this.idCliente;
      }

      const cliente: ClienteModel = {
        Cliente: {
          Id: auxId,
          Nombre: this.clienteForm.value.nombre,
          FechaNacimiento: this.clienteForm.value.fechaNacimiento,
          Apellidos: this.clienteForm.value.apellidos,
          Telefono: this.clienteForm.value.telefono
        },
        Usuario: {
          Email: this.clienteForm.value.email,
        },
        Operacion: aux
      };
      this.clienteSerivce.postCliente(cliente,
        function (confirmacion, idCliente) {
          if (idCliente !== 0) {
            this.msgs.push(confirmacion);
            this.existeEmail = false;
            this.router.navigate(['/clientes']);
          } else {
            this.existeEmail = true;
          }

        }.bind(this));
    }
  }

  btnVolver() {
    this.router.navigate(['/clientes']);
  }

}
