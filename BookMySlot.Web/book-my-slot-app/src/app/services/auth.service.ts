import { Injectable } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { AuthConstants } from '../shared/constants/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorageService: LocalStorageService, private socialAuthService: SocialAuthService) { }

  private loggedIn = this.isUserLoggedIn();
  public logInStatus$ = new BehaviorSubject<boolean>(this.loggedIn);

  isUserLoggedIn(): boolean {

    let accessToken = this.localStorageService.retrieve(AuthConstants.JwtAuthAccessToken);
    if (accessToken) {
      return true;
    }

    return false;
  }

  logIn(token: string) {
    this.localStorageService.store(AuthConstants.JwtAuthAccessToken, token);
    this.loggedIn = true;
    this.logInStatus$.next(this.loggedIn);
  }

  logOut() {
    this.localStorageService.clear(AuthConstants.JwtAuthAccessToken);
    this.socialAuthService.signOut();

    this.loggedIn = false;
    this.logInStatus$.next(this.loggedIn);
  }

}
