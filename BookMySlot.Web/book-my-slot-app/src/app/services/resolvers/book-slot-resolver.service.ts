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

export class BookSlotResolverService implements Resolve<CustomerSlots | ResolverError> {

  constructor(private customerSlotService: CustomerSlotService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomerSlots | ResolverError> {
    let key = "mSds9r%2bj%2fgxH5zDBCd5WoYEFGu0OMHcHx6AK2PdjdFw%2bkqtHd2DHyDefakR0Ut22K1DOWLKCItWWpJNmmIwee69SbxC5nfVC3XC%2fmPytmi0WxMoTGa0we9cpavnmCDJzUFh78%2beUE3aAf%2f3H%2bhlvQLYaZfFTJKeGl3FTNaFNiY06V71RhOdK6YJvOSpzVUe7XPZS0E3rG5veETQwMmD8nYK8MyhTnnbd%2bgjanbBThJuUvx6TrYVcDqILST1peoNRdi4gi6TrtpkBnbdg181UYEwJvyB6OZrBtg9IdqDrwXd5DuEP0DNt6BX61SBlZ4tJecVJnbe4iBHIp2wwBry70D0r2RWogsxcYAH3jjp4jySyiFAzftZwp8HkUJoaae61ZP%2f3o2QHjbFCC%2feLtH8XBVIjJ8W5fqXd8lrL%2f7oQzluUDbsCdNYYxOrAPyGsoHFY6csYG7oHRKrC1ySBx1%2fBKeX%2fHDhGf%2bB5";
    return this.customerSlotService.getCustomerAvailableSlots(PaginationConstants.StartPage, PaginationConstants.PageSize, key)
      .pipe(
        catchError(
          err =>
            of(err)
        )
      );
  }
}
