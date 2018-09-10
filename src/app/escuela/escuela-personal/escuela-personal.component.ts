import { Component, OnInit } from '@angular/core';
import { EscuelaService } from '../service/escuela.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { UtilService } from '../../util/service/util.service';
import { Escuela, EscuelaModel } from '../../models/escuela.model';

@Component({
  selector: 'app-escuela-personal',
  templateUrl: './escuela-personal.component.html',
  styleUrls: ['./escuela-personal.component.css']
})
export class EscuelaPersonalComponent implements OnInit {

  escuela: Escuela = new Escuela;
  msgs: Message[] = [];
  imgConf = {
    src: '../../../assets/img/sinPerfil-660x660.png',
    class: 'img-rounded img-responsive',
    style: '',
    view: true,
    sendImg: function (imagen) {
      this.escuelaService.postImgPerfil(imagen);
    }.bind(this)
  };

  constructor(private escuelaService: EscuelaService, private utilService: UtilService,
    private messageService: MessageService) {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });

    this.escuelaService.imgPerfil$.subscribe(src => {
      if (src !== '') {
        this.imgConf.view = false;
        setTimeout(function () {
          this.imgConf.src = src.__zone_symbol__originalInstance.result;
          this.imgConf.view = true;
        }.bind(this), 100);
      }
    });
    this.escuelaService.escuela$.subscribe(escuela => {
      this.escuela = escuela.Escuela;
      this.inicio();
    });
  }

  inicio() {
    if (this.escuela.FotoPerfil !== null) {
      this.escuelaService.getImgPerfil(this.escuela.FotoPerfil);
    }
  }

  ngOnInit() {
  }

  savePersonal() {
    const e = new EscuelaModel;
    e.Escuela = this.escuela;
    e.Operacion = 'Escuela';
    this.escuelaService.postEscuela(e,
      function (confirmacion, monitor) {
        this.msgs.push(confirmacion);
      }.bind(this));
  }


}
