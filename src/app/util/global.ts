
export function uriApiFun(apiDir: string) {
  const mockBackend = true;
  const uriApi = 'http://localhost:59911/api/';
  const uriJson = '../jsonApi/';

  if (mockBackend) {
    return uriJson + apiDir + '.json';
  }
  return uriApi + apiDir;
}

export const GlobalVar = Object.freeze({
  mockBackend: false,
  uriApi: 'http://localhost:59911/api/',
  // uriApi: 'file:///home/computadora/JoinderNote/src/app/util/jsonApi/',
  jsonApi: 'file:///home/computadora/JoinderNote/src/app/util/jsonApi/',
  imgPerfil: '../../../assets/img/perfiles/'
});
import { Subject } from 'rxjs/Subject';

export const UtilDataTable = Object.freeze({
  iniDataTable(filtros, columnas) {
    return {
      dtOptions: {
        pagingType: 'full_numbers',
        pageLength: 10,
        aaData: [],
        data: [],
        columns: columnas,
        language:
          {
            sProcessing: 'Procesando...',
            sLengthMenu: 'Mostrar _MENU_ registros',
            sZeroRecords: 'No se encontraron resultados',
            sEmptyTable: 'Ningún dato disponible en esta tabla',
            sInfo: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
            sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
            sInfoPostFix: '',
            sSearch: 'Buscar:',
            sUrl: '',
            sInfoThousands: ',',
            sLoadingRecords: 'Cargando...',
            oPaginate: {
              sFirst: 'Primero',
              sLast: 'Último',
              sNext: 'Siguiente',
              sPrevious: 'Anterior'
            },
            oAria: {
              sSortAscending: ': Activar para ordenar la columna de manera ascendente',
              sSortDescending: ': Activar para ordenar la columna de manera descendente'
            }
          },
        lengthChange: false,
        bFilter: false
      },
      dtDatos: [],
      dtTrigger: new Subject(),
      dtFiltros: filtros
    };
  },
  iniFiltro(data, label?, clase?, type?, placeholder?) {
    if (label === undefined) {
      label = data;
    }
    if (type === undefined) {
      type = 'text';
    }
    if (clase === undefined) {
      clase = 'col-xs-6 col-md-3';
    }
    if (placeholder === undefined) {
      placeholder = 'Buscar ' + label;
    }
    return {
      label: label,
      data: data,
      model: '',
      type: type,
      placeholder: placeholder,
      class: clase
    };
  }
});

export class ConfigCalendario {
  vistas = {
    headerRight: true,
    selectMonth: false
  };
  view = 'month';
  viewDate: Date = new Date();
  locale = 'es';
  events$: Observable<Array<{ events: any }>>;
  events: CalendarEvent[] = [];
  trigger = new Subject();
  constructor() {
  }
}
export class DatePicker {
  locale = {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre',
      'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Borrar'
  };
  date: Date;

  constructor() { }
}

export const UtilCalendario = Object.freeze({
  // No lo uso por ahora
  iniCalendario(config: ConfigCalendario) {
    if (config.locale == null) {
      config.locale = 'es';
    }
    if (config.viewDate == null) {
      config.viewDate = new Date();
    }
    if (config.view == null) {
      config.view = 'month';
    }
    if (config.vistas.headerRight == null) {
      config.vistas.headerRight = true;
    }
    if (config.vistas.selectMonth == null) {
      config.vistas.selectMonth = false;
    }
    return config;
  },
  iniEvents(eventos, title) {
    const events = [];
    for (const fechaDisponible of eventos) {
      events.push({
        start: new Date(fechaDisponible.FechaEvento),
        allDay: true,
        title: title,
        color: {
          primary: '#e3bc08',
          secondary: '#FDF1BA'
        }
      });
    }
    return events;
  }
});


export const UtilFechas = Object.freeze({
  calculaEdad(birthdate: any) {
    const fecha = UtilFechas.espAdate(birthdate);
    if (fecha === null) {
      return null;
    }
    birthdate = new Date(fecha);
    const timeDiff = new Date().getFullYear() - birthdate.getFullYear();
    return timeDiff;
  },
  espAdate(fecha: string) {
    /* Formato dd/mm/yyyy a Date*/
    if (fecha === null || fecha === undefined) {
      return null;
    }
    let date;
    let aux = fecha.split('/');
    if (aux.length === 1) {
      aux = fecha.split('T');
      aux = aux[0].split('-');
      date = Date.parse(aux[0] + '-' + aux[1] + '-' + aux[2]);
    } else {
      date = Date.parse(aux[1] + '/' + aux[0] + '/' + aux[2]);
    }
    return new Date(date);
  },
  stringToDate(fecha: string) {
    return new Date(fecha).toDateString;
  },
  addHours(fecha, horas) {
    fecha.setTime(fecha.getTime() + (horas * 60 * 60 * 1000));
    return fecha;
  }
});

import { IMultiSelectSettings, IMultiSelectOption, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { CalendarEvent } from 'calendar-utils';
import { Observable } from 'rxjs/Observable';

export class ConfMultiSelect {
  dataModel: any[];  // Datos
  selectedModel: IMultiSelectOption[];  // Datos seleccionados
  mySettings: IMultiSelectSettings;
  myTexts: IMultiSelectTexts;
  cargado = false;
}

export const MultiSelect = Object.freeze({
  iniMultiSelect(labelSingular, labelPlural, settings?: IMultiSelectSettings) {
    let mySettings: IMultiSelectSettings;
    if (settings !== undefined) {
      if (settings.enableSearch === undefined) {
        settings.enableSearch = true;
      }
      mySettings = {
        enableSearch: settings.enableSearch,
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-default',
        dynamicTitleMaxItems: 3,
        displayAllSelectedText: true,
        selectionLimit: settings.selectionLimit ? settings.selectionLimit : 0,
        autoUnselect: true,
        closeOnSelect: true
      };
    } else {
      mySettings = {
        enableSearch: true,
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-default',
        dynamicTitleMaxItems: 3,
        displayAllSelectedText: true
      };
    }

    // Text configuration
    const myTexts: IMultiSelectTexts = {
      checkAll: 'Seleccionar todas',
      uncheckAll: 'Quitar todas',
      checked: labelSingular + ' seleccionada',
      checkedPlural: labelPlural + ' seleccionadas',
      searchPlaceholder: 'Buscar',
      searchEmptyResult: 'Ningun resultado...',
      searchNoRenderText: 'Sin resultados...',
      defaultTitle: 'Seleccionar ' + labelPlural
    };
    const aux = new ConfMultiSelect;
    aux.mySettings = mySettings;
    aux.myTexts = myTexts;
    aux.selectedModel = [];
    aux.dataModel = [];
    return aux;

  },
  iniSingleSelect(labelSingular, search) {
    let optionsModel: number[];
    let myOptions: IMultiSelectOption[];
    myOptions = [];
    optionsModel = [];
    const mySettings: IMultiSelectSettings = {
      enableSearch: search,
      checkedStyle: 'fontawesome',
      buttonClasses: 'btn btn-default',
      dynamicTitleMaxItems: 3,
      displayAllSelectedText: true,
      selectionLimit: 1,
      autoUnselect: true,
    };

    // Text configuration
    const myTexts: IMultiSelectTexts = {
      checkAll: 'Seleccionar todas',
      uncheckAll: 'Quitar todas',
      checked: labelSingular + ' seleccionada',
      checkedPlural: labelSingular + ' seleccionadas',
      searchPlaceholder: 'Buscar',
      searchEmptyResult: 'Ningun resultado...',
      searchNoRenderText: 'Sin resultados...',
      defaultTitle: 'Seleccionar ' + labelSingular
    };

    return {
      myOptions: myOptions,
      optionsModel: optionsModel,
      mySettings: mySettings,
      myTexts: myTexts
    };

  },
  iniDataModel(options: any[], varId: string, varName: string) {
    const array = [];
    let name = varName;
    const aux = name.split(',');

    for (let i = 0; i < options.length; i++) {
      if (aux.length > 1) {
        name = '';
        for (let j = 0; j < aux.length; j++) {
          name += ' ' + options[i][aux[j]];
        }
      } else {
        array.push({
          id: options[i][varId],
          name: options[i][varName]
        });
      }
    }
    return array;
  }
});


export const UtilFile = Object.freeze({
  imageFromBlob(image: Blob) {
    const reader = new FileReader();
    if (image) {
      reader.readAsDataURL(image);
      return reader;
    }
  }
});

export const UtilMsgs = Object.freeze({
  cambiosGuardados: { severity: 'success', summary: 'Cambios guardados', detail: 'Cambios guardados', life: 10 }

});



