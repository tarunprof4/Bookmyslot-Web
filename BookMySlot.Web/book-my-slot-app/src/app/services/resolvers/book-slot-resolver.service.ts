import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginationConstants } from '../../shared/constants/pagination-constants';
import { CustomerSlots } from '../../shared/customer-slots';
import { ResolverError } from '../../shared/resolver-error';
import { CustomerSlotService } from '../customer-slot.service';

@Injectable({
  providedIn: 'root'
})

export class BookSlotResolverService implements Resolve<CustomerSlots | ResolverError> {

  constructor(private customerSlotService: CustomerSlotService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomerSlots | ResolverError> {

    let key = route.paramMap.get('key');
    return this.customerSlotService.getCustomerAvailableSlots(PaginationConstants.StartPage, PaginationConstants.PageSize, key)
      .pipe(
        catchError(
          err =>
            of(err)
        )
      );
  }
}
