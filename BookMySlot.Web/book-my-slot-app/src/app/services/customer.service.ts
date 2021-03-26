import { Injectable } from '@angular/core';
import { ProfileSettings } from '../shared/profile-settings';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResolverError } from '../shared/resolver-error';
import { environment } from '../../environments/environment';
import { ProfileSummary } from '../shared/profile-summary';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private profileSummaryUrl = environment.apiUrl + '/api/v1/customer';
  private profileSettingsUrl = environment.apiUrl + '/api/v1/profileSettings';
  private profilePicUpdateUrl = environment.apiUrl + '/api/v1/ProfilePicture/UpdateProfilePicture';
  //private profileSettingsUrl = '/api/v1/ProfileSettings';


  constructor(private httpClient: HttpClient) { }


  public getProfileSummary(): Observable<ProfileSummary | ResolverError> {
    return this.httpClient.get<ProfileSummary>(this.profileSummaryUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );

  }

  public getProfileSettings(): Observable<ProfileSettings | ResolverError> {
    return this.httpClient.get<ProfileSettings>(this.profileSettingsUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );

  }



  public updateProfileSettings(profileSettings: ProfileSettings): Observable<boolean | ResolverError> {
    return this.httpClient.put<boolean>(this.profileSettingsUrl, profileSettings).pipe(

      catchError(err => this.handleHttpError(err))
    );
  }


  public updateProfilePicture(file: FormData): Observable<boolean | ResolverError> {
    return this.httpClient.put<boolean>(this.profilePicUpdateUrl, file).pipe(
      catchError(err => this.handleHttpError(err))
    );

  }





  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }



}
