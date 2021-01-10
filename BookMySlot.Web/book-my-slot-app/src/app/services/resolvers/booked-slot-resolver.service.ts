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

    let key = "26eca53c21344dea874c99cc1df9ceef";
    return this.bookedSlotService.getCustomerBookedSlots(key)
      .pipe(
        catchError(
          err =>
            of(err)
        )
      );
  }
}
