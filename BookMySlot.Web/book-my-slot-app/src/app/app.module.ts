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
import { CustomerService } from './services/customer.service';
import { AddHeaderInterceptor } from './shared/Interceptors/add-header.interceptor';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimepickerConfig, TimepickerModule } from 'ngx-bootstrap/timepicker';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  providers: [
    CustomerService,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
    { provide: BsDatepickerConfig, useFactory: getDatepickerConfig },
    { provide: TimepickerConfig, useFactory: getTimepickerConfig  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
