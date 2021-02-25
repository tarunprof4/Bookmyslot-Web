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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logInStatus$.subscribe((data) => {
      this.loggedIn = data;
    });
  }
}


