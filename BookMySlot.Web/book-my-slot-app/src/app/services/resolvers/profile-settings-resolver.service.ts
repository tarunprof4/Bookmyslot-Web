import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ProfileSettings } from '../../shared/profile-settings';
import { ResolverError } from '../../shared/resolver-error';
import { CustomerService } from '../customer.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsResolverService implements Resolve<ProfileSettings | ResolverError> {

  constructor(private customerService: CustomerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProfileSettings | ResolverError> {
    return this.customerService.getProfileSettings()
      .pipe(
        catchError(err => of(err))
      );
  }
}
