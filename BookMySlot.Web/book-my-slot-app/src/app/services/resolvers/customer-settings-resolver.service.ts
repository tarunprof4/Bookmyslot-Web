import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomerSettings } from '../../shared/customer-settings';
import { ResolverError } from '../../shared/resolver-error';
import { CustomerSettingsService } from '../customer-settings.service';

@Injectable({
  providedIn: 'root'
})


export class CustomerSettingsResolverService implements Resolve<CustomerSettings | ResolverError> {

  constructor(private customerSettingsService: CustomerSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomerSettings | ResolverError> {
    return this.customerSettingsService.getCustomerSettings()
      .pipe(
        catchError(err => of(err))
      );
  }
}
