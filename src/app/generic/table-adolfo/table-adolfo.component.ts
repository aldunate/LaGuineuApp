import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-adolfo',
  templateUrl: './table-adolfo.component.html',
  styleUrls: ['./table-adolfo.component.css']
})
export class TableAdolfoComponent implements OnInit {

  @Input() opciones: any;

  constructor() { }

  ngOnInit() {
  }

}
