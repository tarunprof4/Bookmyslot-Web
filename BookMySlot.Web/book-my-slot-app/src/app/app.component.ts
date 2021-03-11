import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log("environ" + environment.production);
    console.log("environ-apiUrl" + environment.apiUrl);
    this.authService.logInStatus$.subscribe((data) => {
      this.loggedIn = data;
    });
  }
}


