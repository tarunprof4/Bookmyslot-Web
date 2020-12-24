import { Injectable } from '@angular/core';
import { ProfileSettings } from '../shared/profile-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private profileSettingsUrl = '/api/profileSettings';


  constructor(private httpClient: HttpClient) { }

  public getProfileSettings(email: string): Observable<ProfileSettings> {

    let profileSettingsUrlById = `${this.profileSettingsUrl}/${email}`;

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


  public saveProfileSettings(profileSettings: ProfileSettings): Observable<string> {
    return this.httpClient.post<string>(this.profileSettingsUrl, profileSettings, this.httpOptions).pipe(
      //tap((email: string) => console.log(email)),
      catchError(this.handleError<string>('save failed'))
    );
  }

  public updateProfileSettings(profileSettings: ProfileSettings): Observable<boolean> {
    return this.httpClient.put<boolean>(this.profileSettingsUrl, profileSettings, this.httpOptions).pipe(
      
      catchError(this.handleError<boolean>('update failed'))
    );
  }


  public deleteProfileSettings(email: string): Observable<boolean> {
    let profileSettingsUrlById = `${this.profileSettingsUrl}/${email}`;

    return this.httpClient.delete<boolean>(profileSettingsUrlById, this.httpOptions).pipe(
      //tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<boolean>('delete user'))
    );
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
