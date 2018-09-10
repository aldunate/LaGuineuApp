import { Component, OnInit, EventEmitter } from '@angular/core';
import { Clase, ClaseService, ClaseModel } from '../service/clase.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfMultiSelect, MultiSelect, DatePicker, ConfigCalendario, UtilCalendario, UtilDataTable, UtilFechas } from '../../util/global';
import { HttpClient } from '@angular/common/http';
import { MonitorService } from '../../monitor/service/monitor.service';
import { UtilService } from '../../util/service/util.service';
import { Router } from '@angular/router';
import { EscuelaService } from '../../escuela/service/escuela.service';
import { duration } from 'moment';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { DAYS_OF_WEEK } from 'calendar-utils';
import { CalendarMonthViewDay } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { WeatherIcons } from '../../util/service/weather';

@Component({
  selector: 'app-clase-nueva',
  templateUrl: './clase-nueva.component.html',
  styleUrls: ['./clase-nueva.component.css']
})
export class ClaseNuevaComponent implements OnInit {
  // Calendario
  configCalendario = new ConfigCalendario();
  viewChange: EventEmitter<string> = new EventEmitter();
  viewDateChange: EventEmitter<Date> = new EventEmitter();
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  body: CalendarMonthViewDay[];
  msgs: Message[] = [];

  // Tabla sin asignar
  tablaClases = UtilDataTable.iniDataTable(
    [
      UtilDataTable.iniFiltro('Nombre', 'Identificador'),
      UtilDataTable.iniFiltro('monitores', 'Monitores'),
    ],
    [
      { title: 'Alumnos', data: 'Personas', type: 'string' },
      { title: 'Identificador', data: 'Nombre', type: 'string' },
      { title: 'Monitores', data: 'monitores', type: 'string' },
      { title: '', data: 'btnIr', type: 'html', orderable: false, className: 'col-xs-1' }
    ]
  );
  tableDatos = new Subject();
  firstTime = true;

  // Estacion
  estacion;
  estacionSelect: any;
  estaciones: any[] = [];

  weather;
  weatherIcons = WeatherIcons;
  dia = {
    fecha: undefined,
    horas: [],
    disponible: false
  };
  // Monitores
  monitores = {
    todos: [],
    visibles: [],
    select: []
  };

  confSelMon: ConfMultiSelect;
  monitorDisabled = true;

  clase = new Clase();
  claseModel = new ClaseModel();
  // Clases
  clases = {
    todas: new Array<ClaseModel>(),
    sinAsignar: new Array<any>(),
    asignadas: new Array<ClaseModel>()
  };
  seleccion = new ClaseModel;

  // Añdir clase
  // Multiselects
  selects = {
    niveles: [],
    estaciones: [],
    edades: []
  };
  correcto = false;
  error = {
    duracion: false,
    alumnos: false,
    nombre: false
  };
  txtTituloFuncion = 'Añadir clase';
  txtBtnGuardar = 'Añadir clase';
  modificando = false;


  constructor(private utilService: UtilService, private monitorService: MonitorService,
    private escuelaService: EscuelaService, private claseService: ClaseService, private messageService: MessageService) {

    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    this.confSelMon = MultiSelect.iniMultiSelect('', '', {
      dynamicTitleMaxItems: 1,
    });

    /* Calendario */
    this.configCalendario.vistas.headerRight = false;
    this.configCalendario.vistas.headerChangeDate = false;
    this.configCalendario.vistas.headerDate = false;
    this.configCalendario.vistas.selectMonth = true;
    this.configCalendario.view = 'day';
    this.configCalendario = UtilCalendario.iniCalendario(this.configCalendario);

    this.getEstacionTiempo();
    this.getMonitoresEscuela();
    this.getClasesEscuelaFecha();
    this.getEstaciones();

    // Niveles
    this.utilService.niveles.subscribe(niveles => {
      this.selects.niveles = niveles ? Array.from(niveles) : [];
      this.selects.niveles.push({ Id: 0, Nombre: 'Indeterminado' });
      this.clase.IdNivel = 0;
    });
    // Edades
    this.selects.edades = this.utilService.edades;
    this.clase.IdEdades = 1;
  }

  changeHoras(operacion) {
    const inicio = Number.parseFloat(this.clase.HoraInicio);
    const fin = Number.parseFloat(this.clase.HoraFin);
    if (!isNaN(inicio) && !isNaN(fin) && inicio <= fin && (inicio && fin) > 0 && (inicio && fin) < 25) {
      this.clase.Duracion = (fin - inicio).toString();
    }
  }
  openModificaClase(modifica) {
    if (modifica) {
      this.txtTituloFuncion = 'Modificar clase';
      this.txtBtnGuardar = 'Guardar cambios';
      this.modificando = true;
    } else {
      this.txtTituloFuncion = 'Añadir clase';
      this.txtBtnGuardar = 'Añadir clase';
      this.modificando = false;
    }
  }

  clickTable(event) {
    if (event.srcElement.localName === 'button') {
      const fila = event.srcElement.parentElement.parentElement;
      const button = event.srcElement;
      if (fila.className.includes('rowSelected')) {
        fila.className = fila.className.split(' rowSelected')[0];
        button.innerHTML = 'Modificar clase';
        button.className = 'btn btn-fill btn-success';
        this.openModificaClase(false);
        this.monitorDisabled = true;
      } else {
        // Jquery
        this.openModificaClase(true);
        $('table button').html('Modificar clase').attr('class', 'btn btn-fill btn-success');
        $('table .rowSelected').attr('class', 'odd');
        // Fin Jquery
        fila.className += ' rowSelected';
        button.innerHTML = 'Cerrar clase';
        button.className = 'btn btn-fill btn-default';

        // Fila seleccionada
        const id = event.srcElement.id;
        this.claseSeleccionada(id);
      }
    }
  }

  crearClase() {
    if (this.compruebaFormulario(undefined)) {
      this.seleccion.Monitores = [];
      this.confSelMon.selectedModel.forEach(idMonitor => {
        let aux = 0;
        if (this.seleccion.Clase !== undefined) {
          aux = this.seleccion.Clase.Id;
        }
        this.seleccion.Monitores.push({
          IdClase: aux,
          IdMonitor: idMonitor
        });
      });
      let idC = 0;
      let op = 'Crear';
      if (this.modificando) {
        idC = this.clase.Id;
        op = 'Editar';
      }
      this.claseModel = {
        Clase: {
          Id: idC,
          Personas: this.clase.Personas,
          Nombre: this.clase.Nombre,
          Fecha: this.configCalendario.viewDate,
          Duracion: this.clase.Duracion,
          HoraInicio: this.clase.HoraInicio,
          HoraFin: this.clase.HoraFin,
          IdEstacion: this.estacionSelect.Id,
          IdNivel: this.clase.IdNivel,
          IdEdades: this.clase.IdEdades
        },
        Clientes: [],
        Monitores: this.seleccion.Monitores,
        Operacion: op
      };
      this.seleccion = new ClaseModel;
      this.claseService.postClase(this.claseModel,
        function (confirmacion, id) {
          if (id !== null) {
            this.msgs.push(confirmacion);
            this.clase = new Clase();
            this.clase.IdNivel = 0;
            this.clase.IdEdades = 1;
            this.confSelMon.selectedModel = [];
            this.getClasesEscuelaFecha();
            this.openModificaClase(false);
          }
        }.bind(this));
    }
  }
  borrarClase() {
    const x = 1;
    this.claseService.deleteClase(this.clase.Id,
      function () {
        this.clase = new Clase();
        this.clase.IdNivel = 0;
        this.clase.IdEdades = 1;
        this.confSelMon.selectedModel = [];
        this.getClasesEscuelaFecha();
        this.openModificaClase(false);
      }.bind(this));
  }

  compruebaFormulario(evento) {
    let correcto = true;
    if (evento === 'Duracion' || evento === undefined) {
      if ((this.clase.Duracion === '' || this.clase.Duracion === undefined)) {
        this.error.duracion = true;
        correcto = false;
      } else {
        this.error.duracion = false;
      }
    }
    if (evento === 'Alumnos' || evento === undefined) {
      if (this.clase.Personas === undefined || this.clase.Personas === null || this.clase.Personas === 0) {
        this.error.alumnos = true;
        correcto = false;
      } else {
        this.error.alumnos = false;
      }
    }
    if (evento === 'Nombre' || evento === undefined) {
      if (this.clase.Nombre === '' || this.clase.Nombre === undefined) {
        this.error.nombre = true;
        correcto = false;
      } else {
        this.error.nombre = false;
      }
    }
    return correcto;
  }

  ngOnInit() {
  }

  changeEstacion(x) {
    const index = this.estaciones.indexOf(this.estacionSelect);
    const length = this.estaciones.length;
    switch (true) {
      case x === -1 && index === 0: {
        this.estacionSelect = this.estaciones[length - 1];
        break;
      }
      case x === 1 && index === (length - 1): {
        this.estacionSelect = this.estaciones[0];
        break;
      }
      default: {
        this.estacionSelect = this.estaciones[index + x];
        break;
      }
    }
    this.getClasesEscuelaFecha();
    this.getEstacionTiempo();
  }

  changeDay() {
    this.rellenarTiempo(this.configCalendario.viewDate);
    this.getClasesEscuelaFecha();
  }

  reloadClases() {
    const idEstacion = this.estacionSelect.Id;
    const clases = [];
    this.clases.sinAsignar = [];
    this.clases.asignadas = [];
    this.monitores.select = this.monitores.todos;

    this.clases.todas.forEach(c => {
      if ((c.Monitores.length === 0 || c.Clase.HoraInicio === null || c.Clase.HoraFin === null) &&
        (c.Clase.IdEstacion === idEstacion || c.Clase.IdEstacion === null)) {
        const s = c.Clase;
        s.btnIr = '<button  id="' + c.Clase.Id + '" class="btn btn-fill  btn-success"> Seleccionar clase </button>';
        this.clases.sinAsignar.push(s);
      } else {
        if (c.Monitores.length > 0 && c.Clase.HoraInicio !== null && c.Clase.HoraFin !== null &&
          c.Clase.IdEstacion === idEstacion) {
          c.Monitores.forEach(x => {
            this.monitores.select = this.monitores.select.filter(m => {
              return m.Id !== x.Id;
            });
          });
          this.clases.asignadas.push(c);
        }
      }
    });

    if (this.firstTime) {
      this.firstTime = false;
      this.tablaClases.dtDatos = this.clases.todas;
      this.tablaClases.dtOptions.data = this.clases.todas;
      this.tablaClases.dtOptions.aaData = this.clases.todas;
      this.tablaClases.dtTrigger.next();
    } else {
      const array = [];
      this.clases.todas.forEach(claseModel => {
        const aux: any = claseModel.Clase;
        aux.monitores = '';
        claseModel.Monitores.forEach(element => {
          const monitor = this.monitores.todos.find(moni => {
            return element.IdMonitor === moni.Id;
          });
          aux.monitores += '  ' + monitor.Nombre + ' ' + monitor.Apellidos + '  ';
        });
        aux.btnIr = '<button  id="' + claseModel.Clase.Id + '" class="btn btn-fill  btn-success"> Modificar clase </button>';
        array.push(aux);
      });
      this.tablaClases.dtDatos = array;
      this.tablaClases.dtOptions.data = array;
      this.tablaClases.dtOptions.aaData = array;
      this.tablaClases.dtTrigger.next(array);
    }

    this.confSelMon = MultiSelect.iniMultiSelect('', '', {
      dynamicTitleMaxItems: 1,
    });
    this.confSelMon.dataModel = MultiSelect.iniDataModel(this.monitores.visibles, 'Id', 'nombreApellido');

  }


  rellenarTiempo(fecha: Date) {
    fecha = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    this.dia.disponible = false;
    this.weather.some(dia => {
      dia.fecha = new Date(dia.fecha.getFullYear(), dia.fecha.getMonth(), dia.fecha.getDate());
      if (fecha.getTime() === dia.fecha.getTime()) {
        this.dia = dia;
        return this.dia.disponible = true;
      } else {
        this.dia.disponible = false;
      }
    });
  }

  getClasesEscuelaFecha() {
    this.claseService.getClasesEscuelaFecha(this.configCalendario.viewDate,
      function (clases: ClaseModel[]) {
        if (clases.length === 0) {
          this.clases.todas = [];
        } else {
          this.clases.todas = clases;
        }
        this.reloadClases();
      }.bind(this)
    );
  }

  getMonitoresEscuela() {
    this.monitorService.getMonitoresEscuela(
      function (monitores) {
        monitores.forEach(element => {
          element.nombreApellido = element.Nombre + ' ' + element.Apellidos;
        });
        this.monitores.todos = monitores;
        this.monitores.visibles = monitores;
        this.reloadClases();
      }.bind(this)
    );
  }

  getEstaciones() {
    this.escuelaService.escuela$.subscribe(
      escuela => {
        if (escuela !== null) {
          this.estaciones = escuela.EstacionesDisponibles;
          this.estacionSelect = this.estaciones[0];
        }
      }
    );
  }

  claseSeleccionada(id) {
    this.confSelMon.selectedModel = [];
    id = Number.parseInt(id);
    const claseModel = this.clases.todas.find(c => {
      if (c.Clase.Id === id) {
        return true;
      }
    });
    this.clase = claseModel.Clase;
    claseModel.Monitores.forEach(element => {
      this.confSelMon.selectedModel.push(element.IdMonitor);
    });

  }

  getEstacionTiempo() {
    this.utilService.getEstacionTiempo(
      function (tiempo) {
        const ahoraFecha = new Date();
        const ahoraHora = ahoraFecha.getHours();

        const weather = [];
        let horas = [];
        tiempo.list.forEach(element => {
          const hora = new Date(element.dt_txt).getHours();
          // tslint:disable-next-line:prefer-const
          let dia;
          if (hora === 9) {
            element.hora = '09:00';
            horas.push(element);
          }
          if (hora === 12) {
            element.hora = '12:00';
            horas.push(element);
          }
          if (hora === 15) {
            element.hora = '15:00';
            horas.push(element);
          }
          if (hora === 18) {
            element.hora = '18:00';
            horas.push(element);
            const aux = new Date(element.dt_txt);
            weather.push({
              fecha: new Date(aux.getFullYear(), aux.getMonth(), aux.getDate()),
              horas: horas
            });
            horas = [];
          }
        });
        this.weather = weather;
        this.rellenarTiempo(this.configCalendario.viewDate);
      }.bind(this));
  }
}
