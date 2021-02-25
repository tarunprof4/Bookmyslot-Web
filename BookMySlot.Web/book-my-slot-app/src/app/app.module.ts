import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { BookSlotComponent } from './book-slot/book-slot.component';
import { ShareSlotComponent } from './share-slot/share-slot.component';
import { SharedSlotsComponent } from './shared-slots/shared-slots.component';
import { BookedSlotsComponent } from './booked-slots/booked-slots.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddHeaderInterceptor } from './shared/Interceptors/add-header.interceptor';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimepickerConfig, TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-bootstrap-spinner';
import { ModalSuccessComponent } from './ui-controls/modal-success/modal-success.component';
import { ModalFailureComponent } from './ui-controls/modal-failure/modal-failure.component';
import { BookedSlotService } from './services/booked-slot.service';
import { CustomerService } from './services/customer.service';
import { CustomerSlotService } from './services/customer-slot.service';
import { DateTimeHelperService } from './services/date-time-helper.service';
import { EmailService } from './services/email.service';
import { GenderService } from './services/gender.service';
import { SlotService } from './services/slot.service';
import { SharedSlotService } from './services/shared-slot.service';
import { SlotSchedulerService } from './services/slot-scheduler.service';
import { TimezoneService } from './services/timezone.service';
import { BookedSlotResolverService } from './services/resolvers/booked-slot-resolver.service';
import { HomeSlotResolverService } from './services/resolvers/home-slot-resolver.service';
import { BookSlotResolverService } from './services/resolvers/book-slot-resolver.service';
import { ProfileSettingsResolverService } from './services/resolvers/profile-settings-resolver.service';
import { SharedSlotResolverService } from './services/resolvers/shared-slot-resolver.service';
import { SearchCustomerComponent } from './search-customer/search-customer.component';

import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { LoginComponent } from './login/login.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { RegisterComponent } from './register/register.component';


export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    containerClass: 'theme-dark-blue',
    showWeekNumbers: false,
    isAnimated: true,
    dateInputFormat: 'MMM D, YYYY'
  });
}


export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 1,
    minuteStep: 10,
    showMeridian: false,
    mousewheel: false,
    showMinutes: true,
    showSeconds: false,
    allowArrowKeys: true,
    hoursPlaceholder: 'hrs',
    minutesPlaceholder: 'mm',
  });
}


export function getModalConfig(): BsModalRef {
  return Object.assign(new BsModalRef(), {
    animated: true
  });
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    HeaderComponent,
    BookSlotComponent,
    ShareSlotComponent,
    SharedSlotsComponent,
    BookedSlotsComponent,
    ProfileSettingsComponent,
    ModalSuccessComponent,
    ModalFailureComponent,
    SearchCustomerComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    SocialLoginModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
    { provide: BsDatepickerConfig, useFactory: getDatepickerConfig },
    { provide: TimepickerConfig, useFactory: getTimepickerConfig },
    { provide: BsModalRef, useFactory: getModalConfig },
    BookedSlotService,
    CustomerService,
    CustomerSlotService,
    DateTimeHelperService,
    EmailService,
    GenderService,
    SharedSlotService,
    SlotService,
    SlotSchedulerService,
    TimezoneService,
    BookedSlotResolverService,
    BookSlotResolverService,
    HomeSlotResolverService,
    ProfileSettingsResolverService,
    SharedSlotResolverService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '44462035680-mjdhi2mvqoe54011ehdp7749gh4o5gnf.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('180612660487206')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
