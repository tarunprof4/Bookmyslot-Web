import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookedSlot } from '../../shared/booked-slot';
import { ResolverError } from '../../shared/resolver-error';
import { BookedSlotService } from '../booked-slot.service';

@Injectable({
  providedIn: 'root'
})

export class BookedSlotResolverService implements Resolve<BookedSlot[] | ResolverError> {

  constructor(private bookedSlotService: BookedSlotService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BookedSlot[] | ResolverError> {

    return this.bookedSlotService.getCustomerBookedSlots()
      .pipe(
        catchError(err => of(err))
      );
  }
}
