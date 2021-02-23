import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BookSlots } from '../shared/book-slots';
import { CustomerSlots } from '../shared/customer-slots';
import { ResolverError } from '../shared/resolver-error';
import { SlotScheduler } from '../shared/slot-scheduler';

@Injectable({
  providedIn: 'root'
})


export class CustomerSlotService {

  //private getDistinctCustomersNearestSlotFromTodayUrl = '/api/v1/CustomerSlot/GetDistinctCustomersNearestSlotFromToday';
  //private getCustomerAvailableSlotsUrl = '/api/v1/CustomerSlot/GetCustomerAvailableSlots';
  //private slotSchedulerUrl = '/api/v1/SlotScheduler';

  private getDistinctCustomersNearestSlotFromTodayUrl = environment.apiUrl + '/api/v1/CustomerSlot/GetDistinctCustomersNearestSlotFromToday';
  private getCustomerAvailableSlotsUrl = environment.apiUrl + '/api/v1/CustomerSlot/GetCustomerAvailableSlots';
  private slotSchedulerUrl = environment.apiUrl + '/api/v1/SlotScheduler';

  constructor(private httpClient: HttpClient) { }

  public getDistinctCustomersNearestSlotFromToday(pageNumber: number, pageSize: number): Observable<CustomerSlots[] | ResolverError> {

    let url = `${this.getDistinctCustomersNearestSlotFromTodayUrl + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize}`;
    return this.httpClient.get<CustomerSlots[]>(url)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }


  public getCustomerAvailableSlots(pageNumber: number, pageSize: number, key: string): Observable<BookSlots | ResolverError> {

    let url = `${this.getCustomerAvailableSlotsUrl + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&customerInfo=" + key}`;
    return this.httpClient.get<BookSlots>(url)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  public scheduleSlot(slotScheduler: SlotScheduler): Observable<boolean | ResolverError> {
    return this.httpClient.post<boolean>(this.slotSchedulerUrl, slotScheduler).pipe(
      //tap((email: string) => console.log(email)),
      catchError(err => this.handleHttpError(err))
    );
  }


  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }

}
