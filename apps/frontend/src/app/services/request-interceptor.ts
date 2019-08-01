import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ServiceHelper} from './services-helper';
import { ConfigData } from '@ang-weather-nx/shared-data';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

  constructor(private sh: ServiceHelper) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isRequestSilent = !!req.params.get('silent');
    const customReq = req.clone(
      req.url.includes(ConfigData.SUBSCRIPTIONS_URL) ?
        ServiceHelper.HTTP_OPTIONS_APP_JSON : ServiceHelper.HTTP_OPTIONS_TEXT_PLAIN);

    this.sh.spinner$.next(isRequestSilent);

    return next.handle(customReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.sh.spinner$.next(true);
        }
      }),
      catchError((response: HttpEvent<any>) => {
        this.sh.spinner$.next(true);
        return throwError(response);
      }));
  }
}
