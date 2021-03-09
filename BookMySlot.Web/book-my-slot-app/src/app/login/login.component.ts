import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { AppConstants } from '../shared/constants/app-constants';
import { RoutingConstants } from '../shared/constants/routing-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit, OnDestroy {

  constructor(private socialAuthService: SocialAuthService, private route: ActivatedRoute, private authService: AuthService, private router: Router, private loginService: LoginService) { }

  returnUrl: string;
  loginSubscriber: any = {};


  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParamMap.get(AppConstants.ReturnUrl);

    this.loginSubscriber = this.socialAuthService.authState.subscribe((user) => {
      if (user != null) {
        this.login(user, this.returnUrl);
      }
    });


  }

  private login(user: SocialUser, returnUrl: string) {
    this.loginService.loginSocialUser(user)
      .subscribe(
        (token: string) => {
          this.authService.logIn(token);

          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          } else {
            this.router.navigate([RoutingConstants.Home]);
          }

        },
        (err: any) => {
          console.log("login failed");
        }
      );
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  register(): void {
    this.router.navigate([RoutingConstants.Register]);
  }

  ngOnDestroy() {
    this.loginSubscriber.unsubscribe();
  }

}
