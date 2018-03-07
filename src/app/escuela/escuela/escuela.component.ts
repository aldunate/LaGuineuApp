import { Component, OnInit } from '@angular/core';
import { EscuelaService, EscuelaModel } from '../service/escuela.service';

@Component({
  selector: 'app-escuela',
  templateUrl: './escuela.component.html',
  styleUrls: ['./escuela.component.css']
})
export class EscuelaComponent implements OnInit {

  escuelaCargado = false;
  escuela: EscuelaModel;
  constructor(private escuelaService: EscuelaService) {
    this.escuela = this.escuelaService.escuela.getValue();
    if (this.escuela === null) {
      this.escuelaService.escuela$.subscribe(escuela => {
        this.escuela = escuela;
        this.escuelaCargado = true;
      });
    } else {
      this.escuelaCargado = true;
    }
  }

  ngOnInit() {
  }

}
