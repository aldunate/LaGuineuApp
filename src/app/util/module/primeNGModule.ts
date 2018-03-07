import {
  CalendarModule
} from 'primeng/calendar';
import { GrowlModule } from 'primeng/growl';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

@NgModule({
  exports: [
    CalendarModule,
    GrowlModule
  ],
  providers: [
    MessageService
  ]
})
export class PrimeNGModule { }


