import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LastSharedSlot } from '../../shared/last-shared-slot';
import { ResolverError } from '../../shared/resolver-error';
import { SlotService } from '../slot.service';

@Injectable({
  providedIn: 'root'
})


export class LastSharedSlotResolverService implements Resolve<LastSharedSlot | ResolverError> {

  constructor(private slotService: SlotService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LastSharedSlot | ResolverError> {
    return this.slotService.getLastSharedSlot()
      .pipe(
        catchError(err => of(err))
      );
  }
}
