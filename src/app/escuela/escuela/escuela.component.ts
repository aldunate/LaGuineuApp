import { Component, OnInit } from '@angular/core';
import { EscuelaService, EscuelaModel } from '../service/escuela.service';
import { UtilService } from '../../util/service/util.service';

@Component({
  selector: 'app-escuela',
  templateUrl: './escuela.component.html',
  styleUrls: ['./escuela.component.css']
})
export class EscuelaComponent implements OnInit {

  escuelaCargado = false;
  escuela: EscuelaModel;
  constructor(private escuelaService: EscuelaService, private utilService: UtilService) {
    this.escuela = this.escuelaService.escuela.getValue();
    if (this.escuela === null) {
      this.escuelaService.escuela$.subscribe(escuela => {
        this.escuela = escuela;
        this.escuelaCargado = true;
        this.inicio();
      });
    } else {
      this.escuelaCargado = true;
      this.inicio();
    }
  }

  inicio() {
    this.utilService.setTextoSuperior({
      titulo: this.escuela.Escuela.Nombre,
      href: 'escuela'
    });
  }

  ngOnInit() {
  }

}
