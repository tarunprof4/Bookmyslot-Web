import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CancelSlot } from '../shared/cancel-slot';
import { HttpStatusConstants } from '../shared/constants/http-status-constants';
import { ResolverError } from '../shared/resolver-error';
import { SlotDetails } from '../shared/slot-details';
import { DateTimeHelperService } from './date-time-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  private slotDetailsUrl = '/api/v1/slot';
  private cancelSlotUrl = 'api/v1/Slot/CancelSlot';

  constructor(private httpClient: HttpClient, private dateTimeHelperService: DateTimeHelperService) { }

  public saveSlotDetails(slotDetails: SlotDetails, slotDate: Date, slotStartTime: Date, slotEndTime: Date): Observable<string | ResolverError> {
    slotDetails.slotDate = this.dateTimeHelperService.getDateString(slotDate);
    slotDetails.slotStartTime = this.dateTimeHelperService.getTimeSpan(slotStartTime);
    slotDetails.slotEndTime = this.dateTimeHelperService.getTimeSpan(slotEndTime);

    return this.httpClient.post<string>(this.slotDetailsUrl, slotDetails).pipe(
      //tap((email: string) => console.log(email)),
      catchError(err => this.handleHttpError(err))
    );
  }

  public cancelSlot(slotKey: string, deletedBy: string): Observable<boolean | ResolverError> {
    let cancelSlot = new CancelSlot();
    cancelSlot.slotKey = slotKey;
    cancelSlot.cancelledBy = deletedBy;
    return this.httpClient.post<boolean>(this.cancelSlotUrl, cancelSlot).pipe(
      catchError(err => this.handleHttpError(err))
    );

  }




  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }
}
