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


  //private profileSettingsUrl = '/api/v1/profileSettings';
  private profileSettingsUrl = '/api/v1/customer';


  constructor(private httpClient: HttpClient) { }

  public getProfileSettings(email: string): Observable<ProfileSettings | ResolverError> {

    let profileSettingsUrlById = `${this.profileSettingsUrl}/${email}`;

    return this.httpClient.get<ProfileSettings>(profileSettingsUrlById)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
    
  }


  public saveProfileSettings(profileSettings: ProfileSettings): Observable<string | ResolverError> {
    return this.httpClient.post<string>(this.profileSettingsUrl, profileSettings).pipe(
      //tap((email: string) => console.log(email)),
      catchError(err => this.handleHttpError(err))
    );
  }

  public updateProfileSettings(profileSettings: ProfileSettings): Observable<boolean | ResolverError> {
    return this.httpClient.put<boolean>(this.profileSettingsUrl, profileSettings).pipe(
      
      catchError(err => this.handleHttpError(err))
    );
  }


  public deleteProfileSettings(email: string): Observable<boolean | ResolverError> {
    let profileSettingsUrlById = `${this.profileSettingsUrl}/${email}`;

    return this.httpClient.delete<boolean>(profileSettingsUrlById).pipe(
      //tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(err => this.handleHttpError(err))
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
 


}
