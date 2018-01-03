
import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK
} from 'angular-calendar';
// import { CustomDateFormatter } from './custom-date-formatter';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  providers: [
    /*{
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }*/
  ]
})
export class CalendarComponent {
  view = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  locale = 'fr';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  constructor() {
    const x = 1;
  }

}
