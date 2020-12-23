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
import { HttpClientModule } from '@angular/common/http';

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
    ProfileSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
