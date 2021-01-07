import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomerSlots } from '../shared/customer-slots';
import { ResolverError } from '../shared/resolver-error';

@Injectable({
  providedIn: 'root'
})


export class CustomerSlotService {

  private getDistinctCustomersNearestSlotFromTodayUrl = '/api/v1/CustomerSlot/GetDistinctCustomersNearestSlotFromToday';
  private getCustomerAvailableSlotsUrl = '/api/v1/CustomerSlot/GetCustomerAvailableSlots';

  constructor(private httpClient: HttpClient) { }

  public getDistinctCustomersNearestSlotFromToday(pageNumber: number, pageSize: number): Observable<CustomerSlots[] | ResolverError> {

    let url = `${this.getDistinctCustomersNearestSlotFromTodayUrl + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize}`;
    return this.httpClient.get<CustomerSlots[]>(url)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }


  public getCustomerAvailableSlots(pageNumber: number, pageSize: number, key: string): Observable<CustomerSlots | ResolverError> {

    let url = `${this.getCustomerAvailableSlotsUrl + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&key=" + key}`;
    return this.httpClient.get<CustomerSlots>(url)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }

}
