import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {ContentType} from '@angular/http/src/enums';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* add authorization header with currentUser token if available */
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      request = request.clone({
        url: environment.serverUrl + request.url,
        setHeaders: {
          Authorization: `${'Bearer '+currentUser.token}`,
        //  'Content-Type': 'text/html'
        },
        withCredentials: false,
        //  ContentType:
      });
    } else {
      request = request.clone({
        url: environment.serverUrl + request.url ,
        setHeaders: {
          'Content-Type': 'application/json'

        },
        withCredentials: false});
    }
    return next.handle(request);
  }
}
