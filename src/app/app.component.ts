import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import { TokenService } from './auth/service/token.service';
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
  public logueado: boolean;

  @ViewChild(NavBarComponent) navbar: NavBarComponent;

  constructor(public location: Location, private router: Router, private tokenService: TokenService) {
    this.logueado =  tokenService.logueado;
    // true;
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.logueado) {
      // $.material.init();
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
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
    }
    this.runOnRouteChange();
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
    if (this.logueado) {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const ps = new PerfectScrollbar(elemMainPanel);
        ps.update();
      }
    }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  /*
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
   */

}

