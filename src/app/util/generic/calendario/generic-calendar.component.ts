
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { getISOWeek } from 'date-fns';
import { DatePipe } from '@angular/common';
export class CustomDateFormatter extends CalendarDateFormatter {
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new DatePipe(locale).transform(date, 'y', locale);
    const weekNumber: number = getISOWeek(date);
    return `Semana ${weekNumber} del ${year}`;
  }
}
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { DAYS_OF_WEEK } from 'angular-calendar';
import { CalendarEvent } from 'angular-calendar';
import { CalendarMonthViewDay } from 'angular-calendar';

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
export class GenericCalendarComponent {

  @Input() view: string;
  @Input() viewDate: Date;
  @Input() locale = 'es';
  @Input() events: CalendarEvent[];
  @Output() viewChange: EventEmitter<string> = new EventEmitter();
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  diasDisponibles = [];
  diasNoDisponibles = [];

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  mesVista = moment(new Date(), 'MM', 'es');
  mes = this.mesVista.subtract(1, 'month').startOf('month').format('MMMM');

  constructor() { }

  dayClicked($event) {
    if ($event.day.cssClass === 'noDisponibleCell calendarCell') {
      $event.day.cssClass = 'disponibleCell calendarCell';
      this.events.push({
        start: $event.day.date,
        allDay: true,
        title: '',
        color: colors.red,
      });
    } else {
      const index = this.events.findIndex(event => event.start.getTime() === $event.day.date.getTime());
      this.events.splice(index, 1);
      $event.day.cssClass = 'noDisponibleCell calendarCell';
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      const found = this.events.find(event => event.start.getTime() === day.date.getTime());
      if (found !== undefined) {
        day.cssClass = 'disponibleCell calendarCell';
      } else {
        day.cssClass = 'noDisponibleCell calendarCell';
      }
    });
  }

  changeDate(viewDate) {
    let x = 1;
  }

}
