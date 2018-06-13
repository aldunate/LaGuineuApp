import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import { TokenService } from './auth/service/token.service';
import { UtilService } from './util/service/util.service';
import { EscuelaService } from './escuela/service/escuela.service';
// declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  public logueado = false;
  loading = false;
  loadingClass = 'loadingClass';

  @ViewChild(NavBarComponent) navbar: NavBarComponent;

  constructor(public location: Location, private router: Router,
    private tokenService: TokenService,
    private utilService: UtilService, private escuelaService: EscuelaService) {

    this.utilService.loading$.subscribe(loading => {
      this.loading = loading;
      if (loading) {
        this.loadingClass = 'loadingClass';

      } else {
        this.loadingClass = '';
      }
    });


    this.tokenService.logueado.subscribe(logueado => {
      this.logueado = logueado;
      if (logueado) {
        this.escuelaService.escuela$.subscribe(escuela => {
          this.logueado = escuela ? true : false;
        });
        this.escuelaService.getEscuela();
        this.utilService.getEstaciones();
        this.utilService.getDeportes();
        this.utilService.getNiveles();
        this.utilService.getTitulos();
        this.iniView();
      } else {
      }
    });
    this.tokenService.getToken();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  iniView() {
    /*const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      this.navbar.sidebarClose();
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);

        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      elemMainPanel.scrollTop = 0;
      elemSidebar.scrollTop = 0;
    });
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      let ps = new PerfectScrollbar(elemMainPanel);
      ps = new PerfectScrollbar(elemSidebar);
    }
    this.runOnRouteChange();*/
  }

  isMaps(path) {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path === titlee) {
      return false;
    } else {
      return true;
    }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }
}

