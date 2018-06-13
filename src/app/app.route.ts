import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './auth/registro/registro.component';
import { MainComponent } from './main/main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { MonitorCreaComponent } from './monitor/monitor-crea/monitor-crea.component';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { MonitoresComponent } from './monitor/monitores/monitores.component';
import { LoginActivate } from './auth/service/login-activate.interceptor';
import { LoginLayoutComponent } from './util/layout/login.layout';
import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './util/layout/home.layout';
import { MonitorComponent } from './monitor/monitor/monitor.component';
import { EscuelaComponent } from './escuela/escuela/escuela.component';
import { ClasesComponent } from './clase/clases/clases.component';
import { ClaseNuevaComponent } from './clase/clase-nueva/clase-nueva.component';
import { UsuariosComponent } from './usuario/usuarios/usuarios.component';
import { UsuarioNuevoComponent } from './usuario/usuario-nuevo/usuario-nuevo.component';
import { ClientesComponent } from './cliente/clientes/clientes.component';
import { ClienteNuevoComponent } from './cliente/cliente-nuevo/cliente-nuevo.component';
import { ClubComponent } from './club/club/club.component';
import { ClubesComponent } from './club/clubes/clubes.component';
import { ClubNuevoComponent } from './club/club-nuevo/club-nuevo.component';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'main', title: 'Main', icon: 'dashboard', class: '' },
  { path: 'clases', title: 'Clases', icon: 'library_books', class: '' },
  { path: 'monitores', title: 'Monitores', icon: 'accessibility_new', class: '' },
  { path: 'clientes', title: 'Clientes', icon: 'supervisor_account', class: '' },
  { path: 'clubes', title: 'Clubes', icon: 'weekend', class: '' },
  { path: 'escuela', title: 'Escuela', icon: 'school', class: '' },
  { path: 'usuarios', title: 'Usuarios', icon: 'account_box', class: '' }
];

export const textoSuperior = [
  { path: 'main', title: 'Main' },
  { path: 'clases', title: 'Clases' },
  { path: 'monitores', title: 'Monitores' },
  { path: 'escuela', title: 'Escuela' },
  { path: 'crea-monitor', title: 'Nuevo monitor' },
  { path: 'nuevo-usuario', title: 'Nuevo usuario' },
  { path: 'usuarios', title: 'Usuarios' },
  { path: 'clientes', title: 'Clientes' },
  { path: 'cliente-nuevo', title: 'Nuevo cliente' },
  { path: 'clubes', title: 'Clubes' },
];


const appRoutes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'crea-monitor', component: MonitorCreaComponent },
  { path: 'monitores', component: MonitoresComponent, canActivate: [LoginActivate] },
  { path: 'monitor/:id', component: MonitorComponent },
  { path: 'escuela', component: EscuelaComponent },
  { path: 'clases', component: ClasesComponent },
  { path: 'clase-nueva', component: ClaseNuevaComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'cliente/:id', component: ClienteNuevoComponent },
  { path: 'cliente-nuevo', component: ClienteNuevoComponent },
  { path: 'clubes', component: ClubesComponent },
  { path: 'club/:id', component: ClubNuevoComponent },
  { path: 'club-nuevo', component: ClubNuevoComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuario/:id', component: UsuarioNuevoComponent },
  { path: 'nuevo-usuario', component: UsuarioNuevoComponent },
  { path: 'main', component: MainComponent },
  { path: '', component: MainComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class Route { }
