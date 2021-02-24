import { Injectable } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthConstants } from '../shared/constants/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorageService: LocalStorageService) { }

  facebookLoginProvider: FacebookLoginProvider = new FacebookLoginProvider('2817970748513714');



  isUserLoggedIn(): boolean {

    let accessToken = this.localStorageService.retrieve(AuthConstants.JwtAuthAccessToken);
    if (accessToken) {
      return true;
    }

    return false;
  }



  logOut() {
    this.localStorageService.clear(AuthConstants.JwtAuthAccessToken);
  }

}
