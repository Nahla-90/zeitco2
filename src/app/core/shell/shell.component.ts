import {Component} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  public user: string;

  constructor(
    public router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

  }

  /* Logout User Then redirect to login page */
  logout(e: Event) {
    e.preventDefault();
    this.authenticationService.logout();
    this.router.navigate(['/login'], {replaceUrl: true});
  }
}
