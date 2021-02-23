import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ResolverError } from '../shared/resolver-error';
import { SlotScheduler } from '../shared/slot-scheduler';

@Injectable({
  providedIn: 'root'
})


export class SlotSchedulerService {

  
  //private slotSchedulerUrl = '/api/v1/SlotScheduler';
  private slotSchedulerUrl = environment.apiUrl + '/api/v1/SlotScheduler';

  constructor(private httpClient: HttpClient) { }

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
