import { Component, OnInit } from '@angular/core';
import { EscuelaService, EscuelaModel } from '../service/escuela.service';

@Component({
  selector: 'app-escuela-muro',
  templateUrl: './escuela-muro.component.html',
  styleUrls: ['./escuela-muro.component.css']
})
export class EscuelaMuroComponent implements OnInit {

  private escuela: EscuelaModel;

  constructor(private escuelaService: EscuelaService) {

  }

  ngOnInit() {
  }

}
