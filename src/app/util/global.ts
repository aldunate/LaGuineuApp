
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

export const UtilCalendario = Object.freeze({
  colors: {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  }
});


export const UtilFechas = Object.freeze({
  calculaEdad(birthdate: any) {
    birthdate = new Date(UtilFechas.espAdate(birthdate));
    const timeDiff = new Date().getFullYear() - birthdate.getFullYear();
    return timeDiff;
  },
  espAdate(fecha: string) {
    /* Formato dd/mm/yyyy a Date*/
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

export const MultiSelect = Object.freeze({
  iniMultiSelect(labelSingular, labelPlural) {
    let optionsModel: number[];
    let myOptions: IMultiSelectOption[];
    myOptions = [];
    optionsModel = [];
    const mySettings: IMultiSelectSettings = {
      enableSearch: true,
      checkedStyle: 'fontawesome',
      buttonClasses: 'btn btn-default',
      dynamicTitleMaxItems: 3,
      displayAllSelectedText: true
    };

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
    return {
      myOptions: myOptions,
      optionsModel: optionsModel,
      mySettings: mySettings,
      myTexts: myTexts,
    }

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
      myTexts: myTexts,
    }

  },
  iniOptions(options: any[], varId: string, varName: string) {
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
