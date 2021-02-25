import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subscriber } from 'rxjs';
import { AuthConstants } from '../shared/constants/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorageService: LocalStorageService) { }

  private loggedIn = this.isUserLoggedIn();
  public logger = new Observable<boolean>((observer: Subscriber<boolean>) => {
    observer.next(this.loggedIn);
  });



  isUserLoggedIn(): boolean {

    let accessToken = this.localStorageService.retrieve(AuthConstants.JwtAuthAccessToken);
    if (accessToken) {
      return true;
    }

    return false;
  }

  logIn(token: string) {
    this.loggedIn = true;
    this.localStorageService.store(AuthConstants.JwtAuthAccessToken, token);
  }

  logOut() {
    this.loggedIn = false;
    this.localStorageService.clear(AuthConstants.JwtAuthAccessToken);
  }

}
