import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './usuario/registro/registro.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main/main.component';
import { LoginComponent } from './usuario/login/login.component';
import { CreaMonitorComponent } from './monitor/crea-monitor/crea-monitor.component';
import { EditarMonitorComponent } from './monitor/editar-monitor/editar-monitor.component';


const appRoutes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'crea-monitor', component: CreaMonitorComponent },
  { path: 'editar-monitor/:id', component: EditarMonitorComponent },
  { path: '', component: MainComponent}
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
