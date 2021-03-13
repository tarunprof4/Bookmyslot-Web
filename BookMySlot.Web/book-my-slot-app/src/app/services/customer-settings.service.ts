import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CustomerSettings } from '../shared/customer-settings';
import { ResolverError } from '../shared/resolver-error';

@Injectable({
  providedIn: 'root'
})

export class CustomerSettingsService {


  private customerSettingsUrl = environment.apiUrl + '/api/v1/customerSettings';
  //private profileSettingsUrl = '/api/v1/ProfileSettings';


  constructor(private httpClient: HttpClient) { }

  public getCustomerSettings(): Observable<CustomerSettings | ResolverError> {
    return this.httpClient.get<CustomerSettings>(this.customerSettingsUrl)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );

  }




  public updateCustomerSettings(customerSettings: CustomerSettings): Observable<boolean | ResolverError> {
    return this.httpClient.put<boolean>(this.customerSettingsUrl, customerSettings).pipe(

      catchError(err => this.handleHttpError(err))
    );
  }





  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }



}
