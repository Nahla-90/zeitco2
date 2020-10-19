import {Component, NgModule} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {RestaurantService} from '@app/core/services/restaurant.service';


@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.scss']
})
export class RestaurantViewComponent {
  public restaurantService: RestaurantService = new RestaurantService(this.httpClient,this.formBuilder);
private _routeListener:any;

  constructor(private httpClient: HttpClient, private _activeRoute: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder) {

    this._routeListener = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const qParams = this._activeRoute.snapshot.params;
        this.restaurantService.loadRestaurantById(qParams.id);
      });
  }
}
