import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  constructor() {

  }

  timeZones: string[] = ['Europe/London', 'Asia/Kolkata'];

  public getTimeZones(): string[] {
    return this.timeZones;
  }
 
}
