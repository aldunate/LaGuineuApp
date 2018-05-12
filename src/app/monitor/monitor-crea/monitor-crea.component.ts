import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Output } from '@angular/core';
import { TokenService } from '../../auth/service/token.service';
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

  constructor(private http: HttpClient, private tokenService: TokenService,
    private monitorService: MonitorService,
    private utilService: UtilService,
    private router: Router, private fb: FormBuilder) {
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
    this.utilService.niveles$.subscribe(titulos => {
      this.confSelEst.dataModel = MultiSelect.iniDataModel(titulos, 'Id', 'Nombre');
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
          Nombre: (this.monitorForm.value.nombre + '.' + this.monitorForm.value.apellidos).replace(' ', '-')
        },
        Titulos: titulos,
        EstacionesDisponibles: [],
        FechasDisponibles: [],
        Operacion: 'Crear'
      };
      this.monitorService.postMonitor(monitor, 'Crear',
        function (id) {
          this.router.navigate(['/monitor/' + id]);
        }.bind(this));
    }
  }

  btnVolver() {
    this.router.navigate(['/monitores']);
  }

}
