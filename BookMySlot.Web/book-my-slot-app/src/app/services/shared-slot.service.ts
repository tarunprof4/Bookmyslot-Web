import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResolverError } from '../shared/resolver-error';
import { ShareSlot } from '../shared/shared-slot';

@Injectable({
  providedIn: 'root'
})
export class SharedSlotService {

  private getCustomerYetToBeBookedSlotsUrl = 'api/v1/CustomerSharedSlot/GetCustomerYetToBeBookedSlots';
  private getCustomerBookedSlotsUrl = 'api/v1/CustomerSharedSlot/GetCustomerBookedSlots';
  private getCustomerCompletedSlotsUrl = 'api/v1/CustomerSharedSlot/GetCustomerCompletedSlots';
  private getCustomerCancelledSlotsUrl = 'api/v1/CustomerSharedSlot/GetCustomerCancelledSlots';

  constructor(private httpClient: HttpClient) { }

  public getCustomerYetToBeBookedSlots(key: string): Observable<ShareSlot[] | ResolverError> {
    let url = `${this.getCustomerYetToBeBookedSlotsUrl + "?customerId=" + key }`;
    return this.httpClient.get<ShareSlot[]>(url)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }


  public getCustomerBookedSlots(key: string): Observable<ShareSlot[] | ResolverError> {
    let url = `${this.getCustomerBookedSlotsUrl + "?customerId=" + key}`;
    return this.httpClient.get<ShareSlot[]>(url)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  public getCustomerCompletedSlots(key: string): Observable<ShareSlot[] | ResolverError> {
    let url = `${this.getCustomerCompletedSlotsUrl + "?customerId=" + key}`;
    return this.httpClient.get<ShareSlot[]>(url)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }


  public getCustomerCancelledSlots(key: string): Observable<ShareSlot[] | ResolverError> {
    let url = `${this.getCustomerCancelledSlotsUrl + "?customerId=" + key}`;
    return this.httpClient.get<ShareSlot[]>(url)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }







  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }

}
