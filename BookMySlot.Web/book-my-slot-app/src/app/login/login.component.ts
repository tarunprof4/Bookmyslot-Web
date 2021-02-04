import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AuthConstants } from '../shared/constants/auth-constants';
import { RoutingConstants } from '../shared/constants/routing-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService, private sessionStorageService: SessionStorageService, private router: Router) { }

  ngOnInit(): void {

    this.socialAuthService.authState.subscribe((user) => {
      let loggedIn = (user != null);
      this.sessionStorageService.store(AuthConstants.JwtAuthAccessToken, user);

      if (loggedIn) {
        this.router.navigate([RoutingConstants.Home]);
      }
    });

  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  refreshToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }


}
