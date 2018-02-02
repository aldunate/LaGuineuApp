// ng serve -  echo 65536 | sudo tee -a /proc/sys/fs/inotify/max_user_watches

// Angular core
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Plugins
// Angular Material
import { MaterialAngularModule, MY_FORMATS } from './util/plugins/material/materialAngular';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';
import 'hammerjs';
// Multiselect
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

// Adolfo Plugins
import { ImgUploadComponent } from './util/generic/img-upload/img-upload.component';

// Components adolfo
import { AppComponent } from './app.component';
import { RegistroComponent } from './usuario/registro/registro.component';
import { MainComponent } from './main/main/main.component';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import { LoginComponent } from './usuario/login/login.component';
import { CreaMonitorComponent } from './monitor/crea-monitor/crea-monitor.component';
import { Route } from './app.route';
import { UsuarioService } from './usuario/service/usuario.service';
import { TokenService } from './usuario/service/token.service';
import { BackendInterceptor } from './util/service/backend.interceptor';
import { MonitorService } from './monitor/service/monitor.service';
import { EditarMonitorComponent } from './monitor/editar-monitor/editar-monitor.component';

import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { GenericCalendarComponent } from './util/generic/calendario/generic-calendar.component';
import { NuevaEscuelaComponent } from './escuela/nueva-escuela/nueva-escuela.component';
import { EditarEscuelaComponent } from './escuela/editar-escuela/editar-escuela.component';
import { EscuelaService } from './escuela/service/escuela.service';
import { GestionEscuelaComponent } from './escuela/gestion-escuela/gestion-escuela.component';
import { NuevaClaseComponent } from './clase/nueva-clase/nueva-clase.component';
import { EstacionComponent } from './estacion/estacion/estacion.component';
import { EstacionService } from './estacion/service/estacion.service';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { ClubComponent } from './club/club/club.component';
import { ClienteService } from './cliente/service/cliente.service';
import { ClubService } from './club/service/club.service';
import { UtilService } from './util/service/util.service';
import { FooterComponent } from './main/footer/footer.component';
// import { TableGenericComponent } from './util/generic/table-generic/table-generic.component';
import { TableAdolfoComponent } from './generic/table-adolfo/table-adolfo.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    MainComponent,
    NavBarComponent,
    LoginComponent,
    CreaMonitorComponent,
    ImgUploadComponent,
   //  TableGenericComponent,
    EditarMonitorComponent,
    // Calendar
    GenericCalendarComponent,
    NuevaEscuelaComponent,
    EditarEscuelaComponent,
    GestionEscuelaComponent,
    NuevaClaseComponent,
    EstacionComponent,
    ClienteComponent,
    ClubComponent,
    FooterComponent,
    TableAdolfoComponent

  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule,
    Route,
    MatNativeDateModule, MaterialAngularModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    //  Calendar
    CalendarModule.forRoot(),
    CommonModule
  ],
  providers: [
    UsuarioService,
    // Interceptors
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true },
    BackendInterceptor,
    TokenService,
    MonitorService,
    EscuelaService,
    EstacionService,
    ClienteService,
    ClubService,
    UtilService,
    // ImgUploadComponent,
    // DatePicker
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
