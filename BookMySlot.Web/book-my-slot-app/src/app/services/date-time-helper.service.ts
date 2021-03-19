import { Injectable } from '@angular/core';
import { DelimiterConstants } from '../shared/constants/delimiter-constants';

@Injectable({
  providedIn: 'root'
})
export class DateTimeHelperService {

  constructor() {

  }

  getTimeSpanString(date: Date): string {
    let timeSpan = date.getHours() + DelimiterConstants.Time + date.getMinutes() + DelimiterConstants.Time + date.getSeconds();
    return timeSpan;
  }

  getTotalMinutesFromTimeSpanString(timeSpan: string): number {
    var arr = timeSpan.split(DelimiterConstants.Time);
    let hours = parseInt(arr[0]);
    let minutes = parseInt(arr[1]);
    let totalMinutes = (hours * 60) + minutes;

    return totalMinutes;
  }


  getDateStringWithPadding(date: Date): string {
    let dateString =
      ('0' + (date.getMonth() + 1)).slice(-2) + DelimiterConstants.Date +
      ('0' + date.getDate()).slice(-2) + DelimiterConstants.Date +
      date.getFullYear();

    return dateString;
  }
}
