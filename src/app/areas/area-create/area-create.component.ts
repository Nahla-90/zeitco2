import {Component, NgModule} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {RestaurantService} from '../../core/services/restaurant.service';

@NgModule({
  imports: [Validators]
})
@Component({
  selector: 'app-area-create',
  templateUrl: './area-create.component.html',
  styleUrls: ['./area-create.component.scss']
})
export class AreaCreateComponent {
  private _routeListener: any;
  public loading = false;
  public formMsg = '';
  public class = '';
  public areaId = null;

  areaForm: FormGroup = this.formBuilder.group({
    areaName: ['', [Validators.required, Validators.maxLength(20)]],
    arabicAreaName: ['', [Validators.required, Validators.maxLength(20)]],
    city: ['', [Validators.required]]
  });
  public restaurantService: RestaurantService = new RestaurantService(this.httpClient, this.formBuilder);


  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private _activeRoute: ActivatedRoute,
              private router: Router) {
    this.restaurantService.loadCities();
    this._routeListener = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const qParams = this._activeRoute.snapshot.params;
        if (qParams.id !== null && qParams.id!==undefined) {
          this.areaId = qParams.id;
          this.loadAreaById(qParams.cityId);
        } else {
          this.areaId = null;
        }
      });

  }


  public loadAreaById(cityId) {
    const result = this.httpClient.get<any[]>('/api/v1/cities/' + cityId + '/areas').subscribe(
      (resultData: any) => {

        resultData.forEach(area => {
          if (area.id == this.areaId) {
            console.log('sss');
            this.areaForm = this.formBuilder.group({
              areaName: [area.areaName, [Validators.required, Validators.maxLength(20)]],
              arabicAreaName: [area.arabicAreaName, [Validators.required, Validators.maxLength(20)]],
              city: [cityId, [Validators.required]]
            });
          }
        });

      }, error => {
        console.log(error);
      });
  }

  onSubmit() {
    this.loading = true;
    if (this.areaForm.valid) {
      let params = {
        areaName: this.areaForm.controls['areaName'].value,
        arabicAreaName: this.areaForm.controls['arabicAreaName'].value
      };
      console.log(this.areaForm.controls['city'].value);
      if (this.areaId !== null && this.areaId !== undefined) {
        const result = this.httpClient.put<any[]>('/api/v1/cities/' + this.areaForm.controls['city'].value + '/areas/' + this.areaId, params).subscribe(resultData => {
          this.formMsg = 'area updated successfuly';
          this.class = 'success';
          this.loading = false;
        }, (resultData) => {

          this.formMsg = resultData['error']['text'];
          this.class = 'success';
          this.loading = false;

        });
      } else {
        const result = this.httpClient.post<any[]>('/api/v1/cities/'+ this.areaForm.controls['city'].value+ '/areas/', params).subscribe(resultData => {
          if (resultData['id']) {
            this.formMsg = 'area created successfuly';
            this.class = 'success';
            this.router.navigate(['/cities']);

          } else {
            this.formMsg = 'Sorry, Something went wrong!!!';
            this.class = 'error';
            this.loading = false;

          }
        }, (resultData) => {
          this.formMsg = resultData['error']['errors'][0]['msg'];
          this.class = 'error';
          this.loading = false;

        }, () => {
          this.loading = false;

        });
      }

    } else {
      /* Invalid Form Data Will Display Validation Errors*/
      Object.keys(this.areaForm.controls).forEach(field => {
        console.log(this.areaForm.get(field).errors);
        const control = this.areaForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
      this.loading = false;
    }
  }
}



