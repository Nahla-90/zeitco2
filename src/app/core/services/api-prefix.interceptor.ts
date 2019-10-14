import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* add authorization header with currentUser token if available */
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      request = request.clone({
        url: environment.serverUrl + request.url,
        setHeaders: {
          Authorization: `${currentUser.token}`
        },
        withCredentials: true
      });
    } else {
      request = request.clone({ url: environment.serverUrl + request.url , withCredentials: true});
    }
    return next.handle(request);
  }
}
