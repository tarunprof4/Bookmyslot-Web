import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  constructor() {

  }

  timeZones: string[] = ['EST', 'India Standard Time'];

  public getTimeZones(): string[] {
    return this.timeZones;
  }
 
}
