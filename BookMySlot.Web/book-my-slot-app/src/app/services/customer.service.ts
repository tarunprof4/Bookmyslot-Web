import { Injectable } from '@angular/core';
import { ProfileSettings } from '../shared/profile-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private profileSettingsUrl = '/api/profileSettings';  

  constructor(private httpClient: HttpClient) { }

  public getProfileSettings(email: string): Observable<ProfileSettings> {

    var profileSettingsUrlById = `${this.profileSettingsUrl}/${email}`;

    return this.httpClient.get<ProfileSettings>(profileSettingsUrlById)
      .pipe(
        catchError(this.handleError<ProfileSettings>('getProfileSettings', new ProfileSettings()))
      );

    
    //profileSettings.firstName = "FirstName Name";
    //profileSettings.middleName = "Middle name Name";
    //profileSettings.lastName = "Lastname Name";
    //profileSettings.gender = "Female";
    //profileSettings.email = "a@gmail.com";

    //return profileSettings;
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
