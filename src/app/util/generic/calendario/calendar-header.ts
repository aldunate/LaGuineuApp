import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';


@Component({
    selector: 'app-calendar-header',
    templateUrl: './calendar-header.html'
})
export class CalendarHeaderComponent {
    @Input() view: string;
    @Input() viewDate: Date;
    @Input() locale = 'es';
    @Output() viewChange: EventEmitter<string> = new EventEmitter();
    @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

    mesVista = moment(new Date(), 'MM', 'es');
    mes = this.mesVista.subtract(1, 'month').startOf('month').format('MMMM');

}
