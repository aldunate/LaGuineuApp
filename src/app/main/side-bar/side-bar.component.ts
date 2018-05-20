import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../../app.route';
import { TokenService } from '../../auth/service/token.service';

declare const $: any;


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public menuItems: any[];

  constructor(private tokenService: TokenService) { }
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  cerrarSesion() {
    this.tokenService.remove();
  }

  isNotMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
