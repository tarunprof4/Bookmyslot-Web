import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookSlotComponent } from './book-slot/book-slot.component';
import { BookedSlotsComponent } from './booked-slots/booked-slots.component';
import { HomeComponent } from './home/home.component';
import { ProfileSettingsResolverService } from './profile-settings/profile-settings-resolver.service';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ShareSlotComponent } from './share-slot/share-slot.component';
import { SharedSlotsComponent } from './shared-slots/shared-slots.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'book-slot', component: BookSlotComponent },
  { path: 'share-slot', component: ShareSlotComponent },
  { path: 'shared-slots', component: SharedSlotsComponent },
  { path: 'booked-slots', component: BookedSlotsComponent },
  { path: 'profile-settings', component: ProfileSettingsComponent, resolve: { resolvedProfileSettings: ProfileSettingsResolverService } },
  
  { path: '', redirectTo: '/share-slot', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
