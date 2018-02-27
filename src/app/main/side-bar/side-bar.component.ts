import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../../app.route';

declare const $: any;


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public menuItems: any[];

  ngOnInit() {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isNotMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
}
