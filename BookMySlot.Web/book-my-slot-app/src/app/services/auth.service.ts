import { Injectable } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sessionStorageService: SessionStorageService) { }

  facebookLoginProvider: FacebookLoginProvider = new FacebookLoginProvider('2817970748513714');



  isUserLoggedIn(): boolean {

    let user = this.sessionStorageService.retrieve("user");
    if (user) {
      return true;
    }

    return false;
  }


}
