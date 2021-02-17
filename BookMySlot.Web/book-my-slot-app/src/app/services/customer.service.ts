import { Injectable } from '@angular/core';
import { ProfileSettings } from '../shared/profile-settings';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResolverError } from '../shared/resolver-error';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  //private profileSettingsUrl = '/api/v1/profileSettings';
  private profileSettingsUrl = '/api/v1/ProfileSettings';


  constructor(private httpClient: HttpClient) { }

  public getProfileSettings(email: string): Observable<ProfileSettings | ResolverError> {

    let profileSettingsUrlById = `${this.profileSettingsUrl}/${email}`;

    return this.httpClient.get<ProfileSettings>(profileSettingsUrlById)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );

  }




  public updateProfileSettings(profileSettings: ProfileSettings): Observable<boolean | ResolverError> {
    return this.httpClient.put<boolean>(this.profileSettingsUrl, profileSettings).pipe(

      catchError(err => this.handleHttpError(err))
    );
  }


 


  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }



}
