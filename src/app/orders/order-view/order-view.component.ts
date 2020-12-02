import {Component, NgModule} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent {
  private _routeListener: any;
  private order;

  constructor(private httpClient: HttpClient, private _activeRoute: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder) {

    this._routeListener = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const qParams = this._activeRoute.snapshot.params;
        this.loadOrderById(qParams.id);
      });
  }

  loadOrderById(id) {
    const result = this.httpClient.get<any[]>('/api/v1/orders/' + id).subscribe(
      (resultData: any) => {
        this.order = resultData;
      }, error => {
        console.log(error);
      });
  }
}
