import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CountryService } from '../services/country-service';
import { CustomerSettingsService } from '../services/customer-settings.service';
import { TimezoneService } from '../services/timezone.service';
import { CountryConstants } from '../shared/constants/country-constants';
import { HttpStatusConstants } from '../shared/constants/http-status-constants';
import { PageTitleConstants } from '../shared/constants/page-title-constants';
import { TimezoneConstants } from '../shared/constants/timezone-constants';
import { CountryTimeZone } from '../shared/country-timezone';
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

  constructor(private customerSettingsService: CustomerSettingsService, private timezoneService: TimezoneService,
    private countryService: CountryService, private route: ActivatedRoute, private modalService: BsModalService, private title: Title) { }

  public customerSettings = new CustomerSettings();
  countries: string[];
  private countryTimeZones: CountryTimeZone[];
  filteredCountryTimeZones: CountryTimeZone[];

  resolverError: ResolverError = new ResolverError();
  private bsModalRef: BsModalRef;
  private modalComponent = new ModalComponent();

  

  ngOnInit(): void {
    this.title.setTitle(PageTitleConstants.CustomerSettings);
    this.countries = this.countryService.getCountries();
    this.countryTimeZones = this.timezoneService.getCountryTimeZones();

    let initCustomerSettings: CustomerSettings | ResolverError = this.route.snapshot.data['resolvedCustomerSettings'];

    if (initCustomerSettings instanceof ResolverError) {
      this.resolverError = initCustomerSettings;
      if (this.resolverError.statusCode == HttpStatusConstants.NotFound) {
        console.log("no customer settings");
        this.resolverError.errors = [];
        this.customerSettings.country = CountryConstants.India;
        this.customerSettings.timeZone = TimezoneConstants.India;
      }
    }
    else {
      this.customerSettings = initCustomerSettings;
    }

    this.filteredCountryTimeZones = this.filterTimeZonesByCountry(this.countryTimeZones, this.customerSettings.country);
  }



  onCountrychange(country: string): void {
    console.log(country);
    this.filteredCountryTimeZones = this.filterTimeZonesByCountry(this.countryTimeZones, country);
    this.customerSettings.timeZone = this.filteredCountryTimeZones[0].timeZone;
  }


  onUpdate() {
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


  private filterTimeZonesByCountry(allCountryTimeZones: CountryTimeZone[], country: string): CountryTimeZone[] {
    return allCountryTimeZones.filter(a => a.countryName === country);
  }



}
