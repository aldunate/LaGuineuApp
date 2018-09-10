import { Component, OnInit, OnDestroy } from '@angular/core';
import { EscuelaService } from '../service/escuela.service';
import { UtilService } from '../../util/service/util.service';
import { EscuelaModel } from '../../models/escuela.model';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';

@Component({
  selector: 'app-escuela',
  templateUrl: './escuela.component.html',
  styleUrls: ['./escuela.component.css']
})
export class EscuelaComponent implements OnInit, OnDestroy {


  escuelaCargado = false;
  escuela: EscuelaModel;
  escuelaSubs: Subscription;

  constructor(private escuelaService: EscuelaService, private utilService: UtilService) {

    this.escuelaSubs = this.escuelaService.escuela$.subscribe((escuela) => {
      this.escuela = escuela;
      this.escuelaCargado = true;
      this.inicio();
    });
    this.escuelaService.getEscuela();
  }

  inicio() {
    this.utilService.setTextoSuperior({
      titulo: 'Escuela ' + this.escuela.Escuela.Nombre,
      href: 'escuela'
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.escuelaSubs.unsubscribe();
  }

}
