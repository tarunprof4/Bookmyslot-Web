import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CancelledSlotDetails } from '../shared/cancelled-slot-details';
import { ResolverError } from '../shared/resolver-error';
import { ShareSlot } from '../shared/shared-slot';

@Injectable({
  providedIn: 'root'
})
export class SharedSlotService {


  //private getCustomerYetToBeBookedSlotsUrl = 'api/v1/CustomerSharedSlot/GetCustomerYetToBeBookedSlots';
  //private getCustomerBookedSlotsUrl = 'api/v1/CustomerSharedSlot/GetCustomerBookedSlots';
  //private getCustomerCompletedSlotsUrl = 'api/v1/CustomerSharedSlot/GetCustomerCompletedSlots';
  //private getCustomerCancelledSlotsUrl = 'api/v1/CustomerSharedSlot/GetCustomerCancelledSlots';

  private getCustomerYetToBeBookedSlotsUrl = environment.apiUrl + '/api/v1/CustomerSharedSlot/GetCustomerYetToBeBookedSlots';
  private getCustomerBookedSlotsUrl = environment.apiUrl + '/api/v1/CustomerSharedSlot/GetCustomerBookedSlots';
  private getCustomerCompletedSlotsUrl = environment.apiUrl + '/api/v1/CustomerSharedSlot/GetCustomerCompletedSlots';
  private getCustomerCancelledSlotsUrl = environment.apiUrl + '/api/v1/CustomerSharedSlot/GetCustomerCancelledSlots';


  constructor(private httpClient: HttpClient) { }

  public getCustomerYetToBeBookedSlots(): Observable<ShareSlot | ResolverError> {
    return this.httpClient.get<ShareSlot>(this.getCustomerYetToBeBookedSlotsUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }


  public getCustomerBookedSlots(): Observable<ShareSlot | ResolverError> {
    return this.httpClient.get<ShareSlot>(this.getCustomerBookedSlotsUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  public getCustomerCompletedSlots(): Observable<ShareSlot | ResolverError> {
    return this.httpClient.get<ShareSlot>(this.getCustomerCompletedSlotsUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }


  public getCustomerCancelledSlots(): Observable<CancelledSlotDetails[] | ResolverError> {
    return this.httpClient.get<CancelledSlotDetails[]>(this.getCustomerCancelledSlotsUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }







  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }

}
