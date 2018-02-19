import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './usuario/registro/registro.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main/main.component';
import { LoginComponent } from './usuario/login/login.component';
import { CreaMonitorComponent } from './monitor/crea-monitor/crea-monitor.component';
import { EditarMonitorComponent } from './monitor/editar-monitor/editar-monitor.component';
import { EditarEscuelaComponent } from './escuela/editar-escuela/editar-escuela.component';
import { NuevaEscuelaComponent } from './escuela/nueva-escuela/nueva-escuela.component';
import { GestionEscuelaComponent } from './escuela/gestion-escuela/gestion-escuela.component';
import { NuevaClaseComponent } from './clase/nueva-clase/nueva-clase.component';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { MonitoresComponent } from './monitor/monitores/monitores.component';


const appRoutes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'crea-monitor', component: CreaMonitorComponent },
  { path: 'monitores/:id', component: MonitoresComponent },
  { path: 'monitor/:id', component: EditarMonitorComponent },
  { path: 'escuela/:id', component: EditarEscuelaComponent },
  { path: 'gestion-escuela/:id', component: GestionEscuelaComponent },
  { path: 'nueva-escuela', component: NuevaEscuelaComponent },
  { path: 'clase', component: NuevaClaseComponent },
  { path: 'cliente', component: ClienteComponent },
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
