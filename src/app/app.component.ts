import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Url Checker';
  loginPage = false;

  constructor(public router: Router) {
   /* if (router.url === '/login') {
      this.loginPage = true;
    }*/
  }
  ngOnInit() {
    console.log(this.router);

  }

}
