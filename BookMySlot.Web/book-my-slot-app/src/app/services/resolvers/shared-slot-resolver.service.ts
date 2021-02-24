import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResolverError } from '../../shared/resolver-error';
import { ShareSlot } from '../../shared/shared-slot';
import { SharedSlotService } from '../shared-slot.service';

@Injectable({
  providedIn: 'root'
})


export class SharedSlotResolverService implements Resolve<ShareSlot[] | ResolverError> {

  constructor(private sharedSlotService: SharedSlotService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShareSlot[] | ResolverError> {

    return this.sharedSlotService.getCustomerBookedSlots()
      .pipe(
        catchError(
          err =>
            of(err)
        )
      );
  }
}
