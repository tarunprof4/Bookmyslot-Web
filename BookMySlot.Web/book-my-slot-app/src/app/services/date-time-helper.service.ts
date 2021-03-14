import { Injectable } from '@angular/core';
import { DelimiterConstants } from '../shared/constants/delimiter-constants';

@Injectable({
  providedIn: 'root'
})
export class DateTimeHelperService {

  constructor() {

  }

  getTimeSpan(date: Date): string {
    //let timeSpan = date.getHours() + ":" + date.getMinutes() + ":" + "0";
    let timeSpan = date.getHours() + DelimiterConstants.Time + date.getMinutes() + DelimiterConstants.Time + date.getSeconds();
    return timeSpan;
  }


  getDateString(date: Date): string {
    let dateString = (date.getMonth() + 1) + DelimiterConstants.Date + date.getDate() + DelimiterConstants.Date + date.getFullYear();
    return dateString;
  }
}
