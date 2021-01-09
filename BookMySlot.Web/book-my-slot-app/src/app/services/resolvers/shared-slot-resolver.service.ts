import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
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

    let key = "abc";
    return this.sharedSlotService.getCustomerBookedSlots(key)
      .pipe(
        catchError(
          err =>
            of(err)
        )
      );
  }
}
