import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';
import { RoutingConstants } from '../shared/constants/routing-constants';
import { ProfileSummary } from '../shared/profile-summary';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private customerService: CustomerService, private authService: AuthService, private router: Router) { }

  profileSummary: ProfileSummary;
  routingConstants = RoutingConstants;

  ngOnInit(): void {

    this.customerService.getProfileSummary()
      .subscribe(
        (data: ProfileSummary) => {
          this.profileSummary = data;
        },
        (err: any) => console.log(err)
      );
  }



  logOut(): void {
    this.authService.logOut();
    this.router.navigate([RoutingConstants.Empty]);
  }


}
