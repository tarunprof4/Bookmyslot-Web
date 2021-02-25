import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { AuthConstants } from '../shared/constants/auth-constants';
import { RoutingConstants } from '../shared/constants/routing-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService, private route: ActivatedRoute, private authService: AuthService, private localStorageService: LocalStorageService, private router: Router, private loginService: LoginService) { }

  returnUrl: string;

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    this.socialAuthService.authState.subscribe((user) => {

      this.loginService.loginSocialUser(user)
        .subscribe(
          (token: string) => {
            this.authService.logIn(token);

            if (this.returnUrl) {
              this.router.navigateByUrl(this.returnUrl);
            } else {
              this.router.navigate([RoutingConstants.Home]);
            }

          },
          (err: any) => {
            console.log("login failed");
          }
        );

    });
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

}
