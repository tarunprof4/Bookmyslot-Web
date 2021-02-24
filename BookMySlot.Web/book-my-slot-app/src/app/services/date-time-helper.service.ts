import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeHelperService {

  constructor() {

  }

  getTimeSpan(date: Date): string {
    let timeSpan = date.getHours() + ":" + date.getMinutes() + ":" + "0";
    return timeSpan;
  }


  getDateString(date: Date): string {
    let dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    return dateString;
  }
}
