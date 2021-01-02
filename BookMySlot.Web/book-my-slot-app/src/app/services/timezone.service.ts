import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  //constructor(private timeHours: number[], private timeMinutes: number[]) {

  //  for (let i = 0; i <= 23; i++) {
  //    timeHours.push(i);
  //  }

  //  for (let i = 0; i <= 59; i++) {
  //    timeMinutes.push(i);
  //  }

  //}


  constructor() {

  }

  public getTimeZones(): string[] {
    let timeZones: string[] = ['EST', 'India Standard Time'];
    return timeZones;
  }


  //public getHours(): number[] {
  //  return this.timeHours;
  //}

  //public getMinutes(): number[] {
  //  return this.timeMinutes;
  //}
}
