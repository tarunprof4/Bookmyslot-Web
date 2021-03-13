  import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookSlotComponent } from './book-slot/book-slot.component';
import { BookedSlotsComponent } from './booked-slots/booked-slots.component';
import { CustomerSettingsComponent } from './customer-settings/customer-settings.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { RegisterComponent } from './register/register.component';
import { BookSlotResolverService } from './services/resolvers/book-slot-resolver.service';
import { BookedSlotResolverService } from './services/resolvers/booked-slot-resolver.service';
import { CustomerSettingsResolverService } from './services/resolvers/customer-settings-resolver.service';
import { HomeSlotResolverService } from './services/resolvers/home-slot-resolver.service';
import { ProfileSettingsResolverService } from './services/resolvers/profile-settings-resolver.service';
import { SharedSlotResolverService } from './services/resolvers/shared-slot-resolver.service';
import { ShareSlotComponent } from './share-slot/share-slot.component';
import { SharedSlotsComponent } from './shared-slots/shared-slots.component';
import { RoutingConstants } from './shared/constants/routing-constants';
import { AuthGuard } from './shared/guards/auth.guard';
import { NoAuthGuard } from './shared/guards/no-auth.guard';


const routes: Routes = [
  { path: RoutingConstants.Empty, component: LoginComponent, pathMatch: 'full', canActivate: [NoAuthGuard] },
  { path: RoutingConstants.Register, component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: RoutingConstants.Home, component: HomeComponent, resolve: { resolvedHomeSlots: HomeSlotResolverService }, canActivate: [AuthGuard] },
  { path: RoutingConstants.BookSlot, component: BookSlotComponent, resolve: { resolvedBookCustomerSlots: BookSlotResolverService }, canActivate: [AuthGuard] },
  { path: RoutingConstants.ShareSlot, component: ShareSlotComponent, canActivate: [AuthGuard] },
  { path: RoutingConstants.SharedSlots, component: SharedSlotsComponent, resolve: { resolvedCustomerBookedSlots: SharedSlotResolverService }, canActivate: [AuthGuard] },
  { path: RoutingConstants.BookedSlots, component: BookedSlotsComponent, resolve: { resolvedCustomerBookedSlots: BookedSlotResolverService }, canActivate: [AuthGuard] },
  { path: RoutingConstants.ProfileSettings, component: ProfileSettingsComponent, resolve: { resolvedProfileSettings: ProfileSettingsResolverService }, canActivate: [AuthGuard] },
  { path: RoutingConstants.CustomerSettings, component: CustomerSettingsComponent, resolve: { resolvedCustomerSettings: CustomerSettingsResolverService }, canActivate: [AuthGuard] },

  { path: '**', redirectTo: RoutingConstants.Home, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



