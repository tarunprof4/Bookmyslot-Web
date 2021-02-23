import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ResolverError } from '../shared/resolver-error';
import { SearchCustomer } from '../shared/search-customer';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  //private searchCustomerUrl = '/api/v1/searchcustomer';
  private searchCustomerUrl = environment.apiUrl + '/api/v1/searchcustomer';


  constructor(private httpClient: HttpClient) { }


  public searchCustomers(searchKey: string): Observable<SearchCustomer[] | ResolverError> {

    let searchCustomerBySearchKey = `${this.searchCustomerUrl}/${searchKey}`;

    return this.httpClient.get<SearchCustomer[]>(searchCustomerBySearchKey)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );

  }


  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }



}
