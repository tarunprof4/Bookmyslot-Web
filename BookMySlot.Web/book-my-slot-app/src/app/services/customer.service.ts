import { Injectable } from '@angular/core';
import { ProfileSettings } from '../shared/profile-settings';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  public getProfileSettings(): ProfileSettings {

    let profileSettings = new ProfileSettings();
    profileSettings.firstName = "FirstName Name";
    profileSettings.middleName = "Middle name Name";
    profileSettings.lastName = "Lastname Name";
    profileSettings.gender = "Female";
    profileSettings.email = "a@gmail.com";

    return profileSettings;
  }

  public createProfileSettings(profileSettings: ProfileSettings): string {
    return "";
  }

  public updateProfileSettings(profileSettings: ProfileSettings): boolean {
    return true;
  }

  public deleteProfileSettings(profileSettings: ProfileSettings): boolean {
    return true;
  }
}
