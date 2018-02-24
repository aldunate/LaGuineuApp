import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/main', title: 'Main', icon: 'dashboard', class: '' },
  { path: 'monitores/1', title: 'Monitores', icon: 'notifications', class: '' },
  { path: 'escuela/1', title: 'Escuela', icon: 'notifications', class: '' }
];

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
