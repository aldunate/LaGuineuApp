import { Component, OnInit } from '@angular/core';
import { MultiSelect, ConfMultiSelect } from '../../util/global';
import { EscuelaService } from '../../escuela/service/escuela.service';
import { EstacionService } from '../../estacion/service/estacion.service';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
