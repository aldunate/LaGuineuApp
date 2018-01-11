
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

  constructor() {
  
   }

  dayClicked($event) {
    if ($event.day.cssClass === 'noDisponibleCell') {
      $event.day.cssClass = 'disponibleCell';
      this.diasDisponibles.push($event.day);
    } else {
      $event.day.cssClass = 'noDisponibleCell';
      this.diasDisponibles.push($event.day);
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.date.getDate() % 2 === 1 && day.inMonth) {
        day.cssClass = 'odd-cell';
      }
    });
  }

  changeDate(viewDate) {
    let x = 1;
  }

}
