import {Component, OnDestroy, Input} from '@angular/core';
import {formatDate, registerLocaleData} from '@angular/common';
import localeAR from '@angular/common/locales/ar-EG';
import {ViewChild} from '@angular/core';
import {DataTable} from 'primeng/components/datatable/datatable';

registerLocaleData(localeAR);
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TableService} from '@app/core/services/table.service';
import {filter} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestaurantService} from '../../core/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent {
  @ViewChild('dt') dataTableComponent: DataTable;
  public restaurantTable: TableService = new TableService(this.httpClient);
  public formMsg = '';
  public class = '';
  //public display = false;
  //public declineId = 0;
  //public declineReason = '';
  private _routeListener: any;
  public status = 'APPROVED';
  //public currentModal;
  public modal: any = {
    display: false,
    type: '',
    rowId: 0,
    declineReason: '',
    restaurant: null,
    error: ''
  };
  public filters = {
    area: '',
    noOil: '',
    searchText:''
  };

  public restaurantService: RestaurantService = new RestaurantService(this.httpClient, this.formBuilder);


  constructor(private httpClient: HttpClient,
              private _activeRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.loadAllAreas();

    /* Default sort field for url table is id*/
    this.restaurantTable.sortField = 'id';

    this._routeListener = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const qParams = this._activeRoute.snapshot.params;
        if (qParams.status !== null || qParams.status) {
          if (qParams.status === 'purchased-agreement') {
            this.status = 'PROCEED';
          } else if (qParams.status === 'purchased-non-agreement') {
            this.status = 'PURCHASING-ACCOUNT';
          } else if (qParams.status === 'surveyed') {
            this.status = 'SURVEY-ACCOUNT';
          } else if (qParams.status === 'approved') {
            this.status = 'APPROVED';
          } else if (qParams.status === 'registered') {
            this.status = 'RESTURANT-ACCOUNT';
          }
        } else {
          this.status = 'APPROVED';
        }
        this.filters = {
          searchText: '',
          area: '',
          noOil: ''
        };
        this.restaurantTable.offset = 0;
        this.dataTableComponent.reset();
      });
    //  this.load();
  }

  public load() {
    let params = new HttpParams()
      .set('page', String((this.restaurantTable.offset / this.restaurantTable.limit) + 1))
      .set('status', this.status)
      .set('orderByArea', String(true));

    if (this.status === 'PURCHASING-ACCOUNT') {
      params = params.set('agreement', 'NON-AGREEMENT');
    }
    if (this.filters.noOil !== '') {
      params = params.set('noOil', this.filters.noOil);
    }
    if (this.filters.area !== '') {
      params = params.set('area', this.filters.area);
    }
    if (this.filters.searchText !== '') {
      params = params.set('search', this.filters.searchText);
    }
    // @ts-ignore
    const result = this.httpClient.get<any[]>('/api/v1/restaurant', {params}).subscribe(
      (resultData: any) => {
        this.restaurantTable.records = resultData.data;
        this.restaurantTable.totalRecords = resultData.totalCount;
//        this.restaurantTable.offset = (resultData.page - 1) * resultData.limit;

      }, error => {
        console.log(error);
      });
  }

  public declineSubmitReason() {
    if (this.modal.declineReason !== '') {
      const result = this.httpClient.put<any[]>('/api/v1/restaurant/' + this.modal.rowId + '/ignore', {declineReason: this.modal.declineReason}).subscribe(
        (resultData: any) => {
          this.formMsg = 'Outlet declined successfuly';
          this.class = 'success';
          this.modal.display = false;
        }, error => {
          console.log(error);
        });
    } else {
      this.modal.error = 'Decline Reason required';
    }

    //
  }

  public approveRestaurantSubmit() {
    if (this.restaurantService.userForm.valid) {
      let params = {
        phone: this.restaurantService.userForm.controls['contactNo'].value,
        password: this.restaurantService.userForm.controls['password'].value,
        username: this.restaurantService.userForm.controls['userName'].value,
        restaurantName: this.restaurantService.restaurant.nameEn,
        average: this.restaurantService.restaurant.estimatedQty,
        price: this.restaurantService.restaurant.price,
        space: this.restaurantService.restaurant.outletSpace,
        address: this.restaurantService.restaurant.address,
        branchesNumber: 1,
        outletPhoneNumber: this.restaurantService.restaurant.phoneNumber,
        branches: JSON.stringify([{
          destination: [1, 2],
          area: this.restaurantService.restaurant.area,
          address: this.restaurantService.restaurant.address,
          city: this.restaurantService.restaurant.city
        }
        ]),
        oilType: this.restaurantService.restaurant.oilType,
        payType: this.restaurantService.restaurant.paymentMethod,
        restaurantName_ar: this.restaurantService.restaurant.nameAr,
        status: this.restaurantService.restaurant.status
      };
      const result = this.httpClient.put<any[]>('/api/v1/restaurant/' + this.modal.rowId, params).subscribe(resultData => {
        if (resultData['id']) {
          this.formMsg = 'Outlet updated successfuly';
          this.class = 'success';
          //  this.loading = false;
          const result2 = this.httpClient.put<any[]>('/api/v1/restaurant/' + this.modal.rowId + '/approved', {}).subscribe(
            (resultData2: any) => {
              this.formMsg = 'Outlet approved successfuly';
              this.class = 'success';
              this.modal.display = false;
            }, error2 => {
              this.formMsg = error2;
              this.class = 'error';
            });

        } else {
          this.formMsg = resultData['errors'][0]['msg'];
          this.class = 'error';
          //   this.loading = false;

        }
      }, (resultData) => {

        this.formMsg = resultData['error']['errors'][0]['msg'];
        this.class = 'error';
        // this.loading = false;

      }, () => {

      });

    } else {
      /* Invalid Form Data Will Display Validation Errors*/
      Object.keys(this.restaurantService.userForm.controls).forEach(field => {
        const control = this.restaurantService.userForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
    }
  }

  public declineRestaurant(rowId) {
    this.displayModal(rowId);
    this.modal.type = 'decline';
  }

  public assignPurchaser(rowId) {
    this.displayModal(rowId);
    this.modal.type = 'assignPurchaser';
  }

  public approveRestaurant(rowId) {
    this.displayModal(rowId);
    this.modal.type = 'approve';
    this.restaurantService.loadRestaurantById(rowId);
  }


  public displayModal(rowId) {
    this.modal.display = true;
    this.modal.rowId = rowId;
    this.modal.declineReason = '';
    this.modal.error = '';
  }

  loadRestaurantsLazy(event: any) {
    this.restaurantTable.loadTableLazy(event);
    this.load();
  }

  loadAllAreas() {
    this.restaurantService.areas = [];

    const result = this.httpClient.get<any[]>('/api/v1/cities').subscribe(
      (resultData: any) => {
        resultData.forEach(city => {

          const result2 = this.httpClient.get<any[]>('/api/v1/cities/' + city.id + '/areas').subscribe(
            (resultData2: any) => {
              resultData2.forEach(area => {
                this.restaurantService.areas.push(area);
              });
            }, error2 => {
              console.log(error2);
            });
        });

      }, error => {
        console.log(error);
      }, () => {
      });


  }
}
