import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, tap, delay} from 'rxjs/operators';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthenticationService {
  isLoggedIn = false;
  errors: any = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    return this.http.post<any>('/api/v1/signin', {username: username, password: password}).pipe(
      map((res: any) => {
        /* login successful if there's a token in the response */
        if (res && res.token) {
          /* store username and token in local storage to keep user logged in between page refreshes*/
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: res.token, user: res.user}));
        }
      })
    );
  }

  register(email: string, username: string, phone_number: string, password: string) {
    const result = this.http.post<any[]>('/api/v1/register', {
      email: email,
      username: username,
      phone_number: phone_number,
      password: password
    })
      .subscribe(
        (data: any) => {
          if (data && data.isRegistered) {
            /* If Registered Then redirect to login*/
            this.router.navigate(['/login'], {queryParams: {}});
          } else if (data.errors) {
            this.errors = data.errors;
          } else {
            this.message = data.message;
          }
        }
      );
  }

  logout() {
    /* Remove user from local storage to log user out */
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
  }

  /* This function done when refresh page to check if current user logged in */
  isAuthenticated() {
    return this.http.get('/api/v1/isAuthenticated', {}).pipe(
      map((data: any) => {
        return data.isLogin;
      })
    );
  }
}
