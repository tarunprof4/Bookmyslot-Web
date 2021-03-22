import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { BookedSlot } from '../shared/booked-slot';
import { CancelledSlotInformation } from '../shared/cancelled-slot-information';
import { ResolverError } from '../shared/resolver-error';

@Injectable({
  providedIn: 'root'
})

export class BookedSlotService {

  private getCustomerBookedSlotsUrl = environment.apiUrl + '/api/v1/CustomerBookedSlot/GetCustomerBookedSlots';
  private getCustomerCompletedSlotsUrl = environment.apiUrl + '/api/v1/CustomerBookedSlot/GetCustomerCompletedSlots';
  private getCustomerCancelledSlotsUrl = environment.apiUrl + '/api/v1/CustomerBookedSlot/GetCustomerCancelledSlots';


  //private getCustomerBookedSlotsUrl = 'api/v1/CustomerBookedSlot/GetCustomerBookedSlots';
  //private getCustomerCompletedSlotsUrl = 'api/v1/CustomerBookedSlot/GetCustomerCompletedSlots';
  //private getCustomerCancelledSlotsUrl = 'api/v1/CustomerBookedSlot/GetCustomerCancelledSlots';


  constructor(private httpClient: HttpClient) { }

  public getCustomerBookedSlots(): Observable<BookedSlot | ResolverError> {
    return this.httpClient.get<BookedSlot>(this.getCustomerBookedSlotsUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  public getCustomerCompletedSlots(): Observable<BookedSlot | ResolverError> {
    return this.httpClient.get<BookedSlot>(this.getCustomerCompletedSlotsUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }


  public getCustomerCancelledSlots(): Observable<CancelledSlotInformation[] | ResolverError> {
    return this.httpClient.get<CancelledSlotInformation[]>(this.getCustomerCancelledSlotsUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }







  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }

}
