import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { AuthConstants } from '../shared/constants/auth-constants';
import { RoutingConstants } from '../shared/constants/routing-constants';
import { SocialLoginToken } from '../shared/social-login-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService, private sessionStorageService: SessionStorageService, private router: Router, private loginService: LoginService) { }
  ngOnInit(): void {


    let isUserLoggedIn = this.authService.isUserLoggedIn();
    if (isUserLoggedIn) {
      this.router.navigate([RoutingConstants.Home]);
    }


    else {
      this.socialAuthService.authState.subscribe((user) => {
        let loggedIn = (user != null);

        if (loggedIn) {

          this.loginService.loginSocialUser(user)
            .subscribe(
              (token: string) => {
                this.sessionStorageService.store(AuthConstants.JwtAuthAccessToken, token);
                this.router.navigate([RoutingConstants.Home]);
              },
              (err: any) => {
                console.log("login failed");
              }
            );

        }
      });
    }
   


   

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
