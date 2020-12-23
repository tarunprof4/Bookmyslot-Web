import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { GenderService } from '../services/gender.service';
import { ProfileSettings } from '../shared/profile-settings';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  constructor(private customerService: CustomerService,private genderService: GenderService) { }

  public profileSettings: ProfileSettings;
  public genders: string[];

  ngOnInit(): void {
    this.profileSettings = this.customerService.getProfileSettings();
    this.genders = this.genderService.getGenders();
  }

  

  onSave(profileSettingsForm: NgForm) {
    console.log(profileSettingsForm.value);  // { first: '', last: '' }
    console.log(profileSettingsForm.valid);  // false
  }



}
