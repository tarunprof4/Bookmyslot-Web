import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpStatusConstants } from '../shared/constants/http-status-constants';
import { ResolverError } from '../shared/resolver-error';
import { SlotDetails } from '../shared/slot-details';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  private slotDetailsUrl = '/api/v1/slot';

  constructor(private httpClient: HttpClient) { }

  public saveSlotDetails(slotDetails: SlotDetails): Observable<string | ResolverError> {
    return this.httpClient.post<string>(this.slotDetailsUrl, slotDetails).pipe(
      //tap((email: string) => console.log(email)),
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
