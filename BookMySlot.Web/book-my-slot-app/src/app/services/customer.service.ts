import { Injectable } from '@angular/core';
import { ProfileSettings } from '../shared/profile-settings';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ResolverError } from '../shared/resolver-error';
import { HttpStatusConstants } from '../shared/constants/http-status-constants';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private profileSettingsUrl = '/api/profileSettings';


  constructor(private httpClient: HttpClient) { }

  public getProfileSettings(email: string): Observable<ProfileSettings | ResolverError> {

    let profileSettingsUrlById = `${this.profileSettingsUrl}/${email}`;

    //return this.httpClient.get<ProfileSettings>(profileSettingsUrlById)
    //  .pipe(
    //    catchError(this.handleError<ProfileSettings>('getProfileSettings', new ProfileSettings()))
    //  );


    return this.httpClient.get<ProfileSettings>(profileSettingsUrlById)
      .pipe(
        catchError(err => this.handleHttpError(err))
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


  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();
    
    resolverError.statusCode = error.status;
    console.log(error);


    if (resolverError.statusCode == HttpStatusConstants.NotFound) {
      resolverError.errors.push("No records found");
    }

    else if (resolverError.statusCode == HttpStatusConstants.BadRequest) {
      resolverError.errors = error.error;
    }

    else if (resolverError.statusCode == HttpStatusConstants.InternalServerError) {
      resolverError.errors.push("Some issue with service please try later");
    }


    else if (resolverError.statusCode == HttpStatusConstants.GatewayTimeOut) {
      resolverError.errors.push("Some issue with service please try later");
    }

    return throwError(resolverError);
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
