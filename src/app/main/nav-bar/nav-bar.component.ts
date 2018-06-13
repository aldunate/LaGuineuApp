import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { TokenService } from '../../auth/service/token.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ROUTES, textoSuperior } from '../../app.route';
import { UtilService, Notificacion } from '../../util/service/util.service';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Usuario, UsuarioService } from '../../usuario/service/usuario.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  private listTitles: any[];
  location: Location;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public usuario = new Usuario;
  textoSuperior = {
    path: '',
    title: '#'
  };
  notificaciones = new Array<Notificacion>();

  constructor(location: Location, private element: ElementRef, private tokenService: TokenService,
    private utilService: UtilService, private router: Router, private usuarioService: UsuarioService) {

    this.utilService.notificaciones.subscribe(notificaciones => {
      this.notificaciones = notificaciones;
    });
    this.utilService.notificaciones.next([{ alerta: 'Faltan clases por asignar', enlace: 'clases' }]);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.textoSuperior = this.getTitle(event.url);
      }
    });
    this.tokenService.logueado.subscribe((value) => {

    });
    this.location = location;
    this.sidebarVisible = false;
    this.utilService.textoSuperior.subscribe(texto => {
      this.textoSuperior.title = texto.titulo;
      this.textoSuperior.path = texto.href;
    });
  }

  ngOnInit() {
    this.listTitles = textoSuperior.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.textoSuperior = this.getTitle(this.router.url);
  }

  cerrarSesion() {
    this.tokenService.remove();
  }

  logout() {
    this.tokenService.remove();
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    body.classList.add('nav-open');

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  getTitle(titulo) {
    titulo = titulo.split('/')[1];
    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titulo) {
        return this.listTitles[item];
      }
    }
    return { title: 'Main', path: '#' };
  }

  ngOnDestroy() {
  }

}

