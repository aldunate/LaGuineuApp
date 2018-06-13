import { Component, OnInit } from '@angular/core';
import { UtilDataTable } from '../../util/global';
import { ClubService } from '../service/club.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clubes',
  templateUrl: './clubes.component.html',
  styleUrls: ['./clubes.component.css']
})
export class ClubesComponent implements OnInit {

  tblClubes = UtilDataTable.iniDataTable(
    [
      UtilDataTable.iniFiltro('Nombre')
    ],
    [
      { title: 'Nombre', data: 'Nombre', type: 'string' },
      { title: '', data: 'btnIr', type: 'html', orderable: false, className: 'col-xs-1' }
    ]
  );

  constructor(
    private clubService: ClubService,
    private router: Router, private route: ActivatedRoute) {
    this.iniTabla();
  }

  ngOnInit() {
  }

  iniTabla() {
    this.clubService.getClubesEscuela(
      function (clubs) {
        for (const club of clubs) {
          club.btnIr = '<button  id="' + club.Id + '" class="btn btn-fill  btn-default"> Modificar club </button>';
        }
        this.tblClubes.dtDatos = clubs;
        this.tblClubes.dtOptions.data = clubs;
        this.tblClubes.dtOptions.aaData = clubs;
        this.tblClubes.dtTrigger.next();
      }.bind(this));
  }

  clickTable(event) {
    if (event.srcElement.localName === 'button') {
      const id = event.srcElement.id;
      this.router.navigate(['/club/' + id]);
    }
  }

  addClub() {
    this.router.navigate(['/club-nuevo']);
  }


}
