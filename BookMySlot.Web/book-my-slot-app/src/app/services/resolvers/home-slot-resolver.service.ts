import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginationConstants } from '../../shared/constants/pagination-constants';
import { CustomerSlots } from '../../shared/customer-slots';
import { ResolverError } from '../../shared/resolver-error';
import { CustomerSlotService } from '../customer-slot.service';

@Injectable({
  providedIn: 'root'
})

export class HomeSlotResolverService implements Resolve<CustomerSlots | ResolverError> {

  constructor(private customerSlotService: CustomerSlotService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomerSlots | ResolverError> {
    return this.customerSlotService.getDistinctCustomersNearestSlotFromToday(PaginationConstants.StartPage, PaginationConstants.PageSize)
      .pipe(
        catchError(err => of(err))
      );
  }
}
