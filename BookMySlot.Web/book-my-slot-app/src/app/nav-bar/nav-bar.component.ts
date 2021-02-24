import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';
import { RoutingConstants } from '../shared/constants/routing-constants';
import { ProfileSettings } from '../shared/profile-settings';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private customerService: CustomerService, private authService: AuthService, private router: Router) { }

  profileSettings: ProfileSettings;
  routingConstants = RoutingConstants;

  ngOnInit(): void {

    
    this.customerService.getProfileSettings()
      .subscribe(
        (data: ProfileSettings) => {
          console.log("saved " + data);
          this.profileSettings = data;
        },
        (err: any) => console.log(err)
      );
  }



  logOut(): void {
    this.authService.logOut();
    this.router.navigate([RoutingConstants.Empty]);
  }


}
