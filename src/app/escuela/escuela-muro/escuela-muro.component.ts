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
    if (this.escuelaService._escuela.Escuela !== undefined) {
      this.escuela = this.escuelaService._escuela;
    } else {
      this.escuelaService.escuela$.subscribe(escuela => {
        this.escuela = escuela;
      });
    }
  }

  ngOnInit() {
  }

}
