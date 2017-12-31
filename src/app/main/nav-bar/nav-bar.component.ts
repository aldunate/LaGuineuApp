import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '../../usuario/service/token.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  logueado: boolean;
  listMenu = [
    { Nombre: 'Home', Router: 'main' }
  ];
  constructor(private tokenService: TokenService) {
    tokenService.onLoguin.subscribe((value) => {
      this.logueado = value;
      this.changeUserStatus();
    });
  }

  changeUserStatus() {
    if (this.logueado) {
    }else {
    }
  }

  logout() {
    this.tokenService.remove();
  }
  ngOnInit() { }


}

