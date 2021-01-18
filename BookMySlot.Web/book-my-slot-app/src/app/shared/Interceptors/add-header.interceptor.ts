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


@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let requestId = Guid.create().toString();
    let jsonReq: HttpRequest<any> = req.clone({
      setHeaders: { 'Content-Type': 'application/json', 'ui-request-id': requestId }
    });

    return next.handle(jsonReq)
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            console.log("Interceptor response" + event.body);
          }
        })
    );

    //return next.handle(jsonReq);
  }
}
