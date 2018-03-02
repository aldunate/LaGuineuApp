
import { CalendarDateFormatter, DateFormatterParams, CalendarUtils } from 'angular-calendar';
import { getISOWeek } from 'date-fns';
import { DatePipe } from '@angular/common';
export class CustomDateFormatter extends CalendarDateFormatter {
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new DatePipe(locale).transform(date, 'y', locale);
    const weekNumber: number = getISOWeek(date);
    return `Semana ${weekNumber} del ${year}`;
  }
}
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, OnInit, ViewChildren } from '@angular/core';
import * as moment from 'moment';
import { DAYS_OF_WEEK } from 'angular-calendar';
import { CalendarEvent } from 'angular-calendar';
import { CalendarMonthViewDay } from 'angular-calendar';
import { ConfigCalendario } from '../../global';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-generic-calendar',
  styleUrls: ['./generic-calendar.component.css'],
  templateUrl: './generic-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: CalendarDateFormatter, useClass: CustomDateFormatter }]
})
export class GenericCalendarComponent implements OnInit {

  @Input() configCalendario: ConfigCalendario;
  viewChange: EventEmitter<string> = new EventEmitter();
  viewDateChange: EventEmitter<Date> = new EventEmitter();
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  body: CalendarMonthViewDay[];

  constructor() {
  }


  ngOnInit(): void {
  }

  dayClicked($event) {
    if ($event.day.cssClass === 'noDisponibleCell calendarCell') {
      $event.day.cssClass = 'disponibleCell calendarCell';
      this.configCalendario.events.push({
        start: $event.day.date,
        allDay: true,
        title: '',
        color: colors.red,
      });
    } else {
      const index = this.configCalendario.events.findIndex(event => event.start.getTime() === $event.day.date.getTime());
      this.configCalendario.events.splice(index, 1);
      $event.day.cssClass = 'noDisponibleCell calendarCell';
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    this.body = body;
    body.forEach(day => {
      const found = this.configCalendario.events.find(event => event.start.getTime() === day.date.getTime());
      if (found !== undefined) {
        day.cssClass = 'disponibleCell calendarCell';
      } else {
        day.cssClass = 'noDisponibleCell calendarCell';
      }
    });
    // this.refresh.next();
  }

}
