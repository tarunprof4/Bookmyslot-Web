import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';
import { ProfileSettings } from '../shared/profile-settings';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private customerService: CustomerService, private authService: AuthService, private socialAuthService: SocialAuthService) { }

  profileSettings: ProfileSettings;

  ngOnInit(): void {

    let email = "b@gmail.com";
    this.customerService.getProfileSettings(email)
      .subscribe(
        (data: ProfileSettings) => {
          console.log("saved " + data);
          this.profileSettings = data;
        },
        (err: any) => console.log(err)
      );
  }



  logOut(): void {
    //this.authService.refreshAuthToken(FacebookLoginProvider.PROVIDER_ID);
    this.authService.logOut();

  }


}
