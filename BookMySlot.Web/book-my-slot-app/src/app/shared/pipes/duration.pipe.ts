import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeHelperService } from '../../services/date-time-helper.service';
import { DelimiterConstants } from '../constants/delimiter-constants';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  constructor() {}

  transform(value: string): string {
    var arr = value.split(DelimiterConstants.Time);
    let hours = parseInt(arr[0]);
    let minutes = parseInt(arr[1]);
    return hours + ' hrs' + ' ' + minutes + ' mins';
  }

}
