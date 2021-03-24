import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ResolverError } from '../shared/resolver-error';

@Injectable({
  providedIn: 'root'
})


export class FileService {

  //private searchCustomerUrl = '/api/v1/searchcustomer';
  //private searchCustomerUrl = environment.apiUrl + '/api/v1/searchcustomer';
  
  private uploadFileUrl = 'https://localhost:44305/api/v1/file';


  constructor(private httpClient: HttpClient) { }


  public updateProfilePicture(file: FormData): Observable<boolean | ResolverError> {

    let updateCustomerProfile = "UpdateCustomerProfile";
    let uploadProfilePictureUrl = `${this.uploadFileUrl}/${updateCustomerProfile}`;

    return this.httpClient.put<boolean>(uploadProfilePictureUrl, file).pipe(
      catchError(err => this.handleHttpError(err))
    );

  }


  private handleHttpError(error: HttpErrorResponse): Observable<ResolverError> {
    let resolverError = new ResolverError();

    return resolverError.handleHttpError(error);
  }



}
