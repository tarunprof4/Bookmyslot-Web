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
import { SearchCustomerComponent } from './search-customer/search-customer.component';

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
    NgxSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
    { provide: BsDatepickerConfig, useFactory: getDatepickerConfig },
    { provide: TimepickerConfig, useFactory: getTimepickerConfig },
    { provide: BsModalRef, useFactory: getModalConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
