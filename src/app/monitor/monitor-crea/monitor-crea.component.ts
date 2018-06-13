import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonitorService, Monitor, MonitorModel } from '../service/monitor.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Material Angular
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ConfMultiSelect, MultiSelect } from '../../util/global';
import { UtilService } from '../../util/service/util.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-monitor-crea',
  templateUrl: './monitor-crea.component.html',
  styleUrls: ['./monitor-crea.component.css']
})
export class MonitorCreaComponent implements OnInit {

  correcto = false;
  monitor = new Monitor();
  monitorForm: FormGroup;
  confSelEst: ConfMultiSelect;
  usuario: string;
  msgs: Message[] = [];
  emailExiste = false;


  constructor(private http: HttpClient,
    private monitorService: MonitorService,
    private utilService: UtilService,
    private router: Router, private fb: FormBuilder, private messageService: MessageService) {

    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });

    this.monitorForm = this.fb.group({
      usuario: new FormControl({ value: '', disabled: true }, Validators.required),
      nombre: new FormControl('', [Validators.required]),
      apellidos: ['', Validators.required],
      email: ['', Validators.required && Validators.email],
      telefono: ['', Validators.required],
      fechaNacimiento: '',
      titulos: [[]]
    });

    this.monitorForm.get('nombre').valueChanges.forEach(
      (value: string) => {
        this.monitorForm.value.usuario = value + '.' + this.monitorForm.value.apellidos;
      }
    );
    this.monitorForm.get('apellidos').valueChanges.forEach(
      (value: string) => {
        this.monitorForm.value.usuario = this.monitorForm.value.nombre + '.' + value;
      }
    );
    this.iniSelectedTitulos();

  }

  ngOnInit() {
  }

  get nombre() { return this.monitorForm.get('nombre'); }
  get apellidos() { return this.monitorForm.get('apellidos'); }
  get email() { return this.monitorForm.get('email'); }
  get telefono() { return this.monitorForm.get('telefono'); }

  iniSelectedTitulos() {
    this.confSelEst = MultiSelect.iniMultiSelect('título', 'títulos');
    this.utilService.titulos$.subscribe(titulos => {
      if (titulos !== null) {
        this.confSelEst.dataModel = MultiSelect.iniDataModel(titulos, 'Id', 'Nombre');
      }
    });
  }

  crearMonitor() {
    Object.keys(this.monitorForm.controls).forEach(field => { // {1}
      const control = this.monitorForm.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
    if (this.monitorForm.valid) {
      const titulos = [];
      for (const titulo of this.monitorForm.value.titulos) {
        titulos.push({
          IdTitulo: titulo
        });
      }
      const monitor: MonitorModel = {
        Monitor: {
          Id: 0,
          Nombre: this.monitorForm.value.nombre,
          FechaNacimiento: this.monitorForm.value.fechaNacimiento,
          FotoPerfil: '',
          Apellidos: this.monitorForm.value.apellidos,
          Telefono: this.monitorForm.value.telefono
        },
        Usuario: {
          Email: this.monitorForm.value.email,
        },
        Titulos: titulos,
        EstacionesDisponibles: [],
        FechasDisponibles: [],
        Operacion: 'Crear'
      };
      this.monitorService.postMonitor(monitor, 'Crear',
        function (confirmacion, m) {
          if (m !== null) {
            this.msgs.push(confirmacion);
            this.router.navigate(['/monitor/' + m.Monitor.Id]);
          } else {
            this.emailExiste = true;
          }

        }.bind(this));
    }
  }

  btnVolver() {
    this.router.navigate(['/monitores']);
  }

}
