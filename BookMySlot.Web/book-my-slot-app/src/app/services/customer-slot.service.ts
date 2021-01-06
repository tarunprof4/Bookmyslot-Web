import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpStatusConstants } from '../shared/constants/http-status-constants';
import { CustomerSlots } from '../shared/customer-slots';
import { ResolverError } from '../shared/resolver-error';

@Injectable({
  providedIn: 'root'
})
export class CustomerSlotService {

  private customerSlotsUrl = '/api/v1/CustomerSlot/GetDistinctCustomersNearestSlotFromToday';

  constructor(private httpClient: HttpClient) { }

  public getCustomerSlotDetails(pageNumber: number, pageSize: number): Observable<CustomerSlots | ResolverError> {

    let customerSlotDetailsUrl = `${this.customerSlotsUrl + "?"}${+"pageNumber=" + pageNumber}/${+"pageSize="+pageSize}`;
    return this.httpClient.get<CustomerSlots>(customerSlotDetailsUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }


  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    resolverError.statusCode = error.status;
    console.log(error);


    if (resolverError.statusCode == HttpStatusConstants.NotFound) {
      resolverError.errors.push("No records found");
    }

    else if (resolverError.statusCode == HttpStatusConstants.BadRequest) {
      resolverError.errors = error.error;
    }

    else if (resolverError.statusCode == HttpStatusConstants.InternalServerError) {
      resolverError.errors.push("Some issue with service please try later");
    }


    else if (resolverError.statusCode == HttpStatusConstants.GatewayTimeOut) {
      resolverError.errors.push("Some issue with service please try later");
    }

    return throwError(resolverError);
  }
}

