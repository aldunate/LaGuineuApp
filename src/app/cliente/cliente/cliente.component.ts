import { Component, OnInit } from '@angular/core';
import { MultiSelect } from '../../util/global';
import { ClubService } from '../../club/service/club.service';
import { ClienteService } from '../service/cliente.service';
import { UtilService } from '../../util/service/util.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }


}
