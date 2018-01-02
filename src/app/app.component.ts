import { Component, OnInit, Input, Output } from '@angular/core';
import { TokenService } from './usuario/service/token.service';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // Token
  public _subscription: any;
  public logueado: boolean;

  constructor(private tokenService: TokenService) {
    // Token
    this._subscription = tokenService.onLoguin.subscribe((value) => {
      this.logueado = value;
      this.changeUserStatus();
    });
  }
  changeUserStatus() {
    if (this.logueado) {

    } else {

    }
  }

  logout() {
    this.tokenService.remove();
  }

  ngOnInit() {
    this.tokenService.leer();
  }


  info() { }

}

