import { Injectable } from '@angular/core';
import { DelimiterConstants } from '../shared/constants/delimiter-constants';

@Injectable({
  providedIn: 'root'
})
export class DateTimeHelperService {

  constructor() {

  }

  getTimeSpan(date: Date): string {
    let timeSpan = date.getHours() + DelimiterConstants.Time + date.getMinutes() + DelimiterConstants.Time + date.getSeconds();
    return timeSpan;
  }



  getDateStringWithPadding(date: Date): string {
    let dateString =
      ('0' + (date.getMonth() + 1)).slice(-2) + DelimiterConstants.Date +
      ('0' + date.getDate()).slice(-2) + DelimiterConstants.Date +
      date.getFullYear();

    return dateString;
  }
}
