import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { SessionStorageService } from 'ngx-webstorage';
import { AuthService } from './services/auth.service';
import { AuthConstants } from './shared/constants/auth-constants';
import { RoutingConstants } from './shared/constants/routing-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-my-slot-app test 1';
  loggedIn: boolean;
  

  constructor(private socialAuthService: SocialAuthService, private router: Router, private sessionStorageService: SessionStorageService) { }

  ngOnInit() {

    
    
    this.socialAuthService.authState.subscribe((user) => {
      this.loggedIn = (user != null);
      

      //if (this.loggedIn) {
      //  this.router.navigate([RoutingConstants.Home]);
      //}
    });



  }


}


