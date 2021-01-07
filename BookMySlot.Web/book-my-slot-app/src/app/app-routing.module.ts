import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookSlotComponent } from './book-slot/book-slot.component';
import { BookedSlotsComponent } from './booked-slots/booked-slots.component';
import { HomeComponent } from './home/home.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { BookSlotResolverService } from './services/resolvers/book-slot-resolver.service';
import { HomeSlotResolverService } from './services/resolvers/home-slot-resolver.service';

import { ProfileSettingsResolverService } from './services/resolvers/profile-settings-resolver.service';
import { ShareSlotComponent } from './share-slot/share-slot.component';
import { SharedSlotsComponent } from './shared-slots/shared-slots.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, resolve: { resolvedHomeSlots: HomeSlotResolverService } },
  { path: 'book-slot/:key', component: BookSlotComponent, resolve: { resolvedBookCustomerSlots: BookSlotResolverService } },
  { path: 'share-slot', component: ShareSlotComponent },
  { path: 'shared-slots', component: SharedSlotsComponent },
  { path: 'booked-slots', component: BookedSlotsComponent },
  { path: 'profile-settings', component: ProfileSettingsComponent, resolve: { resolvedProfileSettings: ProfileSettingsResolverService } },
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
