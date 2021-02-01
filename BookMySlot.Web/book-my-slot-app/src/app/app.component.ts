import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { SessionStorageService } from 'ngx-webstorage';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-my-slot-app test 1';
  loggedIn: boolean;
  user: SocialUser;

  constructor(private authService: AuthService, private socialAuthService: SocialAuthService, private router: Router, private sessionStorageService: SessionStorageService) { }

  ngOnInit() {

    let key = this.router.url;

    this.loggedIn = this.authService.isUserLoggedIn();
    if (this.loggedIn) {
      this.router.navigate(['/home']);
    }
    
    this.socialAuthService.authState.subscribe((user) => {
      this.loggedIn = (user != null);
      
      if (this.loggedIn) {
        this.sessionStorageService.store("user", user);
        this.router.navigate(['/home']);
      }
    });




  }


}


