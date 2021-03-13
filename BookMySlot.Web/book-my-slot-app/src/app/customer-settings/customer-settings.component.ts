import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CustomerSettingsService } from '../services/customer-settings.service';
import { HttpStatusConstants } from '../shared/constants/http-status-constants';
import { PageTitleConstants } from '../shared/constants/page-title-constants';
import { CustomerSettings } from '../shared/customer-settings';
import { ResolverError } from '../shared/resolver-error';

@Component({
  selector: 'app-customer-settings',
  templateUrl: './customer-settings.component.html',
  styleUrls: ['./customer-settings.component.css']
})
export class CustomerSettingsComponent implements OnInit {

  constructor(private customerSettingsService: CustomerSettingsService, private route: ActivatedRoute, private modalService: BsModalService, private title: Title) { }

  public customerSettings: CustomerSettings;
  resolverError: ResolverError = new ResolverError();

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

}
