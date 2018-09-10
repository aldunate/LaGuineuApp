import { Component, OnInit } from '@angular/core';
import { EscuelaService } from '../service/escuela.service';
import { EscuelaModel } from '../../models/escuela.model';

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
