import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    /* Check if Current User is logged in */
    console.log(localStorage.getItem('currentUser'));
    if (localStorage.getItem('currentUser') !== null) {
      return of(true);
    } else {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return of(false);
    }

    return this.authenticationService.isAuthenticated().pipe(
      map(e => {
        if (e) {
          return true;
        }
      }),
      catchError(err => {
        /* Not logged in so redirect to login page with the return url */
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return of(false);
      })
    );
  }
}
