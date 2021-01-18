import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { ProfileSettings } from '../shared/profile-settings';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

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

}
