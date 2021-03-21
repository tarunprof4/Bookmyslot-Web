import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeHelperService } from '../../services/date-time-helper.service';
import { DelimiterConstants } from '../constants/delimiter-constants';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  constructor(private dateTimeHelperService: DateTimeHelperService) {}

  transform(value: string, timeIn?: string): number {
    let totalMinutes = this.dateTimeHelperService.getTotalMinutesFromTimeSpanString(value);
    return totalMinutes;
  }

}
