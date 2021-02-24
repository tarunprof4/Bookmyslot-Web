
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Guid } from "guid-typescript";
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthConstants } from '../constants/auth-constants';


@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {


  constructor(private spinner: NgxSpinnerService, private localStorageService: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinner.show();
    let correlationId = Guid.create().toString();
    let accessToken = this.localStorageService.retrieve(AuthConstants.JwtAuthAccessToken);
     

    let jsonReq: HttpRequest<any> = req.clone({
      setHeaders: { 'Content-Type': 'application/json', 'cor-relation-id': correlationId, 'Authorization': `Bearer ${accessToken}` }
    });

    return next.handle(jsonReq)
      .pipe(
        tap(event => {
          this.spinner.hide();
          if (event.type === HttpEventType.Response) {
            console.log("Interceptor response" + event.body);
          }
        })
    );

    //return next.handle(jsonReq);
  }
}
