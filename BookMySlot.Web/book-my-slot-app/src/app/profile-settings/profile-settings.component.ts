import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerService } from '../services/customer.service';
import { GenderService } from '../services/gender.service';
import { HttpStatusConstants } from '../shared/constants/http-status-constants';
import { PageTitleConstants } from '../shared/constants/page-title-constants';
import { RegexConstants } from '../shared/constants/regex-constants';
import { ProfileSettings } from '../shared/profile-settings';
import { ResolverError } from '../shared/resolver-error';
import { ModalComponent } from '../shared/ui-controls/modal-component';
import { ModalFailureComponent } from '../ui-controls/modal-failure/modal-failure.component';
import { ModalSuccessComponent } from '../ui-controls/modal-success/modal-success.component';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  constructor(private customerService: CustomerService, private genderService: GenderService, private route: ActivatedRoute, private modalService: BsModalService, private title: Title) { }

  regexConstants = RegexConstants;
  profileSettings: ProfileSettings;
  genders: string[];

  resolverError: ResolverError = new ResolverError();
  private bsModalRef: BsModalRef;
  private modalComponent = new ModalComponent();

  ngOnInit(): void {
    this.title.setTitle(PageTitleConstants.ProfileSettings);
    let initProfileSettings: ProfileSettings | ResolverError = this.route.snapshot.data['resolvedProfileSettings'];

    if (initProfileSettings instanceof ResolverError) {
      this.resolverError = initProfileSettings;
      if (this.resolverError.statusCode == HttpStatusConstants.NotFound) {
        this.resolverError.errors = [];
      }
    }
    else {

      this.profileSettings = initProfileSettings;
    }
    this.genders = this.genderService.getGenders();
  }


  onUpdate(profileSettingsForm: NgForm, profileSettings: ProfileSettings) {
    

    this.customerService.updateProfileSettings(profileSettings)
      .subscribe(
        (data: boolean) => {
          let successModalComponent = this.modalComponent.getSuccessModalComponent();
          this.bsModalRef = this.modalService.show(ModalSuccessComponent);
          this.bsModalRef.content.title = successModalComponent.title;
          this.bsModalRef.content.bodyItems = successModalComponent.bodyItems;
          window.location.reload(true);
        },
        (err: any) => {
          let failureModalComponent = this.modalComponent.getFailureModalComponent();
          this.bsModalRef = this.modalService.show(ModalFailureComponent);
          this.bsModalRef.content.title = failureModalComponent.title;
          this.bsModalRef.content.bodyItems = err.errors;
        }
      );
  }




}
