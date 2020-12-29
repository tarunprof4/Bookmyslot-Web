import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { GenderService } from '../services/gender.service';
import { RegexConstants } from '../shared/constants/regex-constants';
import { ProfileSettings } from '../shared/profile-settings';
import { ResolverError } from '../shared/resolver-error';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  constructor(private customerService: CustomerService, private genderService: GenderService, private route: ActivatedRoute) { }

  public regexConstants = RegexConstants;
  public profileSettings: ProfileSettings;
  public genders: string[];

  ngOnInit(): void {

    let initProfileSettings: ProfileSettings | ResolverError = this.route.snapshot.data['resolvedProfileSettings'];

    if (initProfileSettings instanceof ResolverError) {
    }
    else {

      this.profileSettings = initProfileSettings;
    }
    this.genders = this.genderService.getGenders();
  }



  onSave(profileSettingsForm: NgForm, profileSettings: ProfileSettings) {
    //console.log(profileSettingsForm.value);  // { first: '', last: '' }
    //console.log(profileSettingsForm.valid);  // false

    this.customerService.saveProfileSettings(profileSettings)
      .subscribe(
        (data: string) => {
          console.log("saved " + data);
        },
        (err: any) => console.log(err)
      );
  }

  onUpdate(profileSettingsForm: NgForm, profileSettings: ProfileSettings) {
    this.customerService.updateProfileSettings(profileSettings)
      .subscribe(
        (data: boolean) => {
          console.log("saved " + data);
        },
        (err: any) => console.log(err)
      );
  }

  onDelete(profileSettingsForm: NgForm, profileSettings: ProfileSettings) {
    this.customerService.deleteProfileSettings(profileSettings.email)
      .subscribe(
        (data: boolean) => {
          console.log("saved " + data);
        },
        (err: any) => console.log(err)
      );
  }



}
