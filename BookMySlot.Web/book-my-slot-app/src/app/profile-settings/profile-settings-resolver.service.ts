import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CustomerService } from '../services/customer.service';
import { ProfileSettings } from '../shared/profile-settings';
import { ResolverError } from '../shared/resolver-error';


@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsResolverService implements Resolve<ProfileSettings | ResolverError> {

  constructor(private customerService: CustomerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProfileSettings | ResolverError> {
    //let emailId = route.data['emailId'];
    return this.customerService.getProfileSettings("aa@gmail.com")
      .pipe(
        catchError(
          err =>
            of(err)
        )
      );
  }
}
