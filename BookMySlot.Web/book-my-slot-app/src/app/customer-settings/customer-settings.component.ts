import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-settings',
  templateUrl: './customer-settings.component.html',
  styleUrls: ['./customer-settings.component.css']
})
export class CustomerSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("CustomerSettingsComponent loaded");
  }

}
