import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResendSlotInformation } from '../shared/resend-slot-information';
import { ResolverError } from '../shared/resolver-error';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  private resendEmailUrl = 'api/v1/Email/ResendSlotInformation';

  constructor(private httpClient: HttpClient) { }



  public resendSlotInformation(slotKey: string, resendTo: string): Observable<boolean | ResolverError> {
    let resendSlotInformation = new ResendSlotInformation();
    resendSlotInformation.resendSlotModel = slotKey;
    resendSlotInformation.resendTo = resendTo;
    return this.httpClient.post<boolean>(this.resendEmailUrl, resendSlotInformation).pipe(
      catchError(err => this.handleHttpError(err))
    );

  }




  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }

}