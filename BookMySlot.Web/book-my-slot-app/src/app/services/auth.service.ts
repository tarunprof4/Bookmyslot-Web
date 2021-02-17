import { Injectable } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
import { SessionStorageService } from 'ngx-webstorage';
import { AuthConstants } from '../shared/constants/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sessionStorageService: SessionStorageService) { }

  facebookLoginProvider: FacebookLoginProvider = new FacebookLoginProvider('2817970748513714');



  isUserLoggedIn(): boolean {

    let accessToken = this.sessionStorageService.retrieve(AuthConstants.JwtAuthAccessToken);
    if (accessToken) {
      return true;
    }

    return false;
  }


}
