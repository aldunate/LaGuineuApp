import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: 'user-profile', title: 'User Profile', icon: 'person', class: '' },
  { path: 'table-list', title: 'Table List', icon: 'content_paste', class: '' },
  { path: 'typography', title: 'Typography', icon: 'library_books', class: '' },
  { path: 'icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  { path: 'maps', title: 'Maps', icon: 'location_on', class: '' },
  { path: 'monitores/1', title: 'Monitores', icon: 'notifications', class: '' }
];

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

}
