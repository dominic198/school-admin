import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { CommonService } from '../shared/common.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private commonService: CommonService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
     this.commonService.loading.next(true);
    if (req.url.includes('upload')) {
      req = req.clone({
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'content-type'
        }),
      });
    } else {
      req = req.clone({
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'content-type',
          'Content-Type': 'application/json',
        }),
      });
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.commonService.loading.next(false);
         }
         return event;
      }),
      catchError((err) => {
        let handled: boolean = false;
        this.commonService.loading.next(false);
        if (err instanceof HttpErrorResponse) {
          if (err instanceof ErrorEvent) {
            console.log('Error Event');
          } else {
            switch (err.status) {
              case 400:
                alert(err.error.message);
                handled = true;
                break;
              case 401:
                handled = true;
                break;
              case 403:
                handled = true;
                break;
              case 404:
                handled = true;
                break;
              case 422:
                handled = true;
                break;
              case 500:
                handled = true;
                break;
            }
          }
        }
        if (handled) {
          return of(err);
        } else {
          return throwError(() => err);
        }
      })
    );
  }
}
