import { Pipe, PipeTransform } from '@angular/core';
import { parse } from 'url';
import { DelimiterConstants } from '../constants/delimiter-constants';

@Pipe({
  name: 'nodaTime'
})
export class NodaTimePipe implements PipeTransform {

  transform(value: string, country: string): string {

    var arr = value.split(DelimiterConstants.ZonedDateTime);
    let day = arr[0];
    let time = arr[1];
    let offset = arr[2];
    let timeZone = arr[3];

    let dayArray = day.split(DelimiterConstants.Date);
    let month = parseInt(dayArray[0]);
    let date = parseInt(dayArray[1]);
    let year = parseInt(dayArray[2]);
    let formattedDate = date + ',' + month + ' ' + year;

    let formattedNodaTime = formattedDate + ' ' + time + ' ' + offset + ' ' + timeZone + ' (' + country + ') GMT';
    return formattedNodaTime;
  }

}
