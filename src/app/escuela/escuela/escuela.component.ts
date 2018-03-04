import { Component, OnInit } from '@angular/core';
import { EscuelaService, EscuelaModel } from '../service/escuela.service';

@Component({
  selector: 'app-escuela',
  templateUrl: './escuela.component.html',
  styleUrls: ['./escuela.component.css']
})
export class EscuelaComponent implements OnInit {

  escuelaCargado = true;
  escuela: EscuelaModel;
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
