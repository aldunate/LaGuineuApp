// ng serve -  echo 65536 | sudo tee -a /proc/sys/fs/inotify/max_user_watches

// Angular core
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Plugins
// Angular Material
import { MaterialAngularModule, MY_FORMATS } from './util/module/materialAngular';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';
import 'hammerjs';
// Multiselect
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
// DataTable
import { DataTablesModule } from 'angular-datatables';

// Adolfo Plugins
import { ImgUploadComponent } from './util/generic/img-upload/img-upload.component';
// Ng PRime
// Loadings plugin
import { LoadersCssModule } from 'angular2-loaders-css';


// Components adolfo
import { AppComponent } from './app.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { MainComponent } from './main/main/main.component';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import { LoginComponent } from './auth/login/login.component';
import { MonitorCreaComponent } from './monitor/monitor-crea/monitor-crea.component';
import { Route } from './app.route';
import { UsuarioService } from './usuario/service/usuario.service';
import { TokenService } from './auth/service/token.service';
import { BackendInterceptor } from './auth/service/backend.interceptor';
import { LoginActivate } from './auth/service/login-activate.interceptor';
import { MonitorService } from './monitor/service/monitor.service';
import { AuthService } from './auth/service/auth.service';
import { MonitorComponent } from './monitor/monitor/monitor.component';

import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { GenericCalendarComponent } from './util/generic/calendario/generic-calendar.component';
import { EscuelaService } from './escuela/service/escuela.service';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { ClubComponent } from './club/club/club.component';
import { ClienteService } from './cliente/service/cliente.service';
import { ClubService } from './club/service/club.service';
import { ClaseService } from './clase/service/clase.service';
import { UtilService } from './util/service/util.service';
import { FooterComponent } from './main/footer/footer.component';
import { DatatableGenericComponent } from './util/generic/datatable-generic/datatable-generic.component';
import { SideBarComponent } from './main/side-bar/side-bar.component';
import { MonitoresComponent } from './monitor/monitores/monitores.component';
import { FieldErrorComponent } from './util/generic/field-error/field-error.component';
import { LoginLayoutComponent } from './util/layout/login.layout';
import { HomeLayoutComponent } from './util/layout/home.layout';
import { PrimeNGModule } from './util/module/primeNGModule';
import { MonitorAjustesComponent } from './monitor/monitor-ajustes/monitor-ajustes.component';
import { MonitorPersonalComponent } from './monitor/monitor-personal/monitor-personal.component';
import { EscuelaComponent } from './escuela/escuela/escuela.component';
import { ClasesComponent } from './clase/clases/clases.component';
import { ClaseAsignarComponent } from './clase/clase-asignar/clase-asignar.component';
import { ClaseNuevaComponent } from './clase/clase-nueva/clase-nueva.component';
import { EscuelaAjustesComponent } from './escuela/escuela-ajustes/escuela-ajustes.component';
import { EscuelaMuroComponent } from './escuela/escuela-muro/escuela-muro.component';
import { EscuelaPersonalComponent } from './escuela/escuela-personal/escuela-personal.component';
import { UsuariosComponent } from './usuario/usuarios/usuarios.component';
import { UsuarioNuevoComponent } from './usuario/usuario-nuevo/usuario-nuevo.component';
import { ClientesComponent } from './cliente/clientes/clientes.component';
import { ClienteNuevoComponent } from './cliente/cliente-nuevo/cliente-nuevo.component';
import { ClubesComponent } from './club/clubes/clubes.component';
import { ClubNuevoComponent } from './club/club-nuevo/club-nuevo.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    MainComponent,
    NavBarComponent,
    LoginComponent,
    MonitorCreaComponent,
    ImgUploadComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    GenericCalendarComponent,
    ClienteComponent,
    ClubComponent,
    FooterComponent,
    DatatableGenericComponent,
    SideBarComponent,
    MonitoresComponent,
    FieldErrorComponent,
    MonitorAjustesComponent,
    MonitorComponent,
    MonitorPersonalComponent,
    EscuelaComponent,
    ClasesComponent,
    ClaseAsignarComponent,
    ClaseNuevaComponent,
    EscuelaAjustesComponent,
    EscuelaMuroComponent,
    EscuelaPersonalComponent,
    UsuariosComponent,
    UsuarioNuevoComponent,
    ClientesComponent,
    ClienteNuevoComponent,
    ClubesComponent,
    ClubNuevoComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule,
    Route,
    MatNativeDateModule, MaterialAngularModule,
    PrimeNGModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    //  Calendar
    CalendarModule.forRoot(),
    CommonModule,
    // Datatable
    DataTablesModule,
    // Loadings plugin
    LoadersCssModule
  ],
  providers: [
    UsuarioService,
    // Interceptors
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true },
    AuthService,
    BackendInterceptor,
    LoginActivate,
    TokenService,
    MonitorService,
    EscuelaService,
    ClienteService,
    ClubService,
    UtilService,
    ClaseService,
    // ImgUploadComponent,
    // DatePicker
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
