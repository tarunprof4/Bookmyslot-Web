import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookedSlot } from '../shared/booked-slot';
import { ResolverError } from '../shared/resolver-error';

@Injectable({
  providedIn: 'root'
})

export class BookedSlotService {

  private getCustomerBookedSlotsUrl = 'api/v1/CustomerBookedSlot/GetCustomerBookedSlots';
  private getCustomerCompletedSlotsUrl = 'api/v1/CustomerBookedSlot/GetCustomerCompletedSlots';
  private getCustomerCancelledSlotsUrl = 'api/v1/CustomerBookedSlot/GetCustomerCancelledSlots';

  constructor(private httpClient: HttpClient) { }

  public getCustomerBookedSlots(key: string): Observable<BookedSlot[] | ResolverError> {
    let url = `${this.getCustomerBookedSlotsUrl + "?customerId=" + key}`;
    return this.httpClient.get<BookedSlot[]>(url)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  public getCustomerCompletedSlots(key: string): Observable<BookedSlot[] | ResolverError> {
    let url = `${this.getCustomerCompletedSlotsUrl + "?customerId=" + key}`;
    return this.httpClient.get<BookedSlot[]>(url)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }


  //public getCustomerCancelledSlots(key: string): Observable<ShareSlot[] | ResolverError> {
  //  let url = `${this.getCustomerCancelledSlotsUrl + "?customerId=" + key}`;
  //  return this.httpClient.get<ShareSlot[]>(url)
  //    .pipe(
  //      catchError(err => this.handleHttpError(err))
  //    );
  //}







  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }

}
