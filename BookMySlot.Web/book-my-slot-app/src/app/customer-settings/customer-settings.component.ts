import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerSettingsService } from '../services/customer-settings.service';
import { HttpStatusConstants } from '../shared/constants/http-status-constants';
import { PageTitleConstants } from '../shared/constants/page-title-constants';
import { CustomerSettings } from '../shared/customer-settings';
import { ResolverError } from '../shared/resolver-error';
import { ModalComponent } from '../shared/ui-controls/modal-component';
import { ModalFailureComponent } from '../ui-controls/modal-failure/modal-failure.component';
import { ModalSuccessComponent } from '../ui-controls/modal-success/modal-success.component';

@Component({
  selector: 'app-customer-settings',
  templateUrl: './customer-settings.component.html',
  styleUrls: ['./customer-settings.component.css']
})
export class CustomerSettingsComponent implements OnInit {

  constructor(private customerSettingsService: CustomerSettingsService, private route: ActivatedRoute, private modalService: BsModalService, private title: Title) { }

  public customerSettings = new  CustomerSettings();
  resolverError: ResolverError = new ResolverError();
  private bsModalRef: BsModalRef;
  private modalComponent = new ModalComponent();

  ngOnInit(): void {
    this.title.setTitle(PageTitleConstants.CustomerSettings);
    let initCustomerSettings: CustomerSettings | ResolverError = this.route.snapshot.data['resolvedCustomerSettings'];

    if (initCustomerSettings instanceof ResolverError) {
      this.resolverError = initCustomerSettings;
      if (this.resolverError.statusCode == HttpStatusConstants.NotFound) {
        console.log("no customer settings");
        this.resolverError.errors = [];
      }
    }
    else {
      this.customerSettings = initCustomerSettings;
      console.log("customer settings found " + this.customerSettings);
    }
  }


  onUpdate() {
    this.customerSettings.timeZone = "Asia/Kolkata";
    this.customerSettingsService.updateCustomerSettings(this.customerSettings)
      .subscribe(
        (data: boolean) => {
          let successModalComponent = this.modalComponent.getSuccessModalComponent();
          this.bsModalRef = this.modalService.show(ModalSuccessComponent);
          this.bsModalRef.content.title = successModalComponent.title;
          this.bsModalRef.content.bodyItems = successModalComponent.bodyItems;
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
