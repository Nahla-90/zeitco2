import {Component, NgModule, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {RestaurantService} from '../../core/services/restaurant.service';
import {DataTable} from 'primeng/components/datatable/datatable';
import {TableService} from '../../core/services/table.service';

@NgModule({
  imports: [Validators]
})
@Component({
  selector: 'app-cities-create',
  templateUrl: './cities-create.component.html',
  styleUrls: ['./cities-create.component.scss']
})
export class CitiesCreateComponent {
  @ViewChild('dt') dataTableComponent: DataTable;
  public areaTable: TableService = new TableService(this.httpClient);
  private _routeListener: any;
  public loading = false;
  public formMsg = '';
  public class = '';
  public cityId = null;
  public currentCity=null;
  cityForm: FormGroup = this.formBuilder.group({
    cityName: ['', [Validators.required, Validators.maxLength(20)]],
    arabicCityName: ['', [Validators.required, Validators.maxLength(20)]],
  });

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private _activeRoute: ActivatedRoute,
              private router: Router) {


    this._routeListener = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const qParams = this._activeRoute.snapshot.params;
        if (qParams.operation === 'update') {
          // this.restaurantService.loadRestaurantById(qParams.id);
          this.cityId = qParams.id;
          this.areaTable.sortField = 'id';
          this.loadCityById();
          this.loadCityArea();
        } else {
          this.cityId = null;
        }
      });
  }

  /* When Form submitted*/
  onSubmit() {
    this.loading = true;
    if (this.cityForm.valid) {
      let params = {
        cityName: this.cityForm.controls['cityName'].value,
        arabicCityName: this.cityForm.controls['arabicCityName'].value
      };
      console.log('here');
      if (this.cityId !== null) {
        const result = this.httpClient.put<any[]>('/api/v1/cities/' + this.cityId, params).subscribe(resultData => {
          this.formMsg = 'City updated successfuly';
          this.class = 'success';
          this.loading = false;
        }, (resultData) => {

          this.formMsg = resultData['error']['text'];
          this.class = 'success';
          this.loading = false;

        });
      } else {
        const result = this.httpClient.post<any[]>('/api/v1/cities/', params).subscribe(resultData => {
          if (resultData['id']) {
            this.formMsg = 'City created successfuly';
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
      Object.keys(this.cityForm.controls).forEach(field => {
        console.log(this.cityForm.get(field).errors);
        const control = this.cityForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
      this.loading = false;
    }
  }
  public loadCityById() {
    const result = this.httpClient.get<any[]>('/api/v1/cities/'+this.cityId).subscribe(
      (resultData: any) => {
        this.cityForm = this.formBuilder.group({
          cityName: [resultData.cityName, [Validators.required, Validators.maxLength(20)]],
          arabicCityName: [resultData.arabicCityName, [Validators.required, Validators.maxLength(20)]],
        });
      }, error => {
        console.log(error);
      });
  }
  public loadCityArea() {
    const result = this.httpClient.get<any[]>('/api/v1/cities/'+this.cityId+'/areas').subscribe(
      (resultData: any) => {
        this.areaTable.records = resultData;
        this.areaTable.totalRecords = resultData.length;
      }, error => {
        console.log(error);
      });
  }
  /* Delete Url */
  deleteArea(areaId) {
    const result = this.httpClient.delete<any[]>('/api/v1/cities/' + this.cityId+'/areas/'+areaId, {}).subscribe(
      (resultData: any) => {
          this.formMsg = 'Area deleted successfuly';
          this.class = 'success';
          this.loadCityArea();

      }, error => {
        this.formMsg = 'Area deleted successfuly';
        this.class = 'success';
        this.loadCityArea();

      });
  }
}



