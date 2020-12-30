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

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let jsonReq: HttpRequest<any> = req.clone({
      setHeaders: { 'Content-Type': 'application/json' }
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
