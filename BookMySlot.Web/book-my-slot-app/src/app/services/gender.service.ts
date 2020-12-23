import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor() { }

  public getGenders(): string[] {

    let genders: string[] = ['Male', 'Female', 'Other'];
    return genders;
  }
}
