import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedIn: boolean;

  constructor(private authService: AuthService, private socialAuthService: SocialAuthService, private router: Router) { }

  ngOnInit(): void {


    this.authService.logger.subscribe((data) => {
      console.log("logged in stat" + data);
      this.loggedIn = data;
    });

    //this.loggedIn = this.authService.isUserLoggedIn();
    
    //this.socialAuthService.authState.subscribe((user) => {
    //  this.loggedIn = (user != null);


    //  //this.socialAuthService.signOut();

    //  //if (this.loggedIn) {
    //  //  this.router.navigate([RoutingConstants.Home]);
    //  //}
    //});



  }


}


