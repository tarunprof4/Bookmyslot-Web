import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ResolverError } from '../shared/resolver-error';
import { SocialLoginToken } from '../shared/social-login-token';

@Injectable({
  providedIn: 'root'
})


export class LoginService {


  private socialLoginUrl = environment.apiUrl + 'api/v1/Login/SocialCustomerLogin';
  //private socialLoginUrl = 'api/v1/Login/SocialCustomerLogin';


  constructor(private httpClient: HttpClient) { }



  public loginSocialUser(socialUser: SocialUser): Observable<string | ResolverError> {
    return this.httpClient.post<string>(this.socialLoginUrl, socialUser).pipe(

      catchError(err => this.handleHttpError(err))
    );
  }





  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }



}
