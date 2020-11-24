import {Component, NgModule} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {RestaurantService} from '@app/core/services/restaurant.service';

@NgModule({
  imports: [Validators]
})
@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.scss']
})
export class RestaurantCreateComponent {
  private _routeListener: any;
  public restaurantService: RestaurantService = new RestaurantService(this.httpClient, this.formBuilder);
  public loading = false;
  public user;
  public status;
  public formMsg = '';
  public class = '';
  public outletSpaces = ['0 - 50', '50 - 150', '200+'];
  public paymentMenthods = [
    {value: 'PostPaid', name: 'Post Paid'},
    {value: 'CashOnDelivery', name: 'Cash On Delivery'},
    {value: 'UnKnown', name: 'UnKnown'}
  ];
  public oilTypes = ['Canola', 'Sunflower', 'Palm', 'Olive'];
  public estimatedQty = ['0 - 50', '50 - 100', '100 - 150', '150 - 200', '200+'];
  public classes = ['CLASS-A', 'CLASS-B', 'CLASS-C'];
  public titles = ['owner', 'operator', 'manager'];
  public restaurantId = null;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private _activeRoute: ActivatedRoute,
              private router: Router) {

    this._routeListener = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const qParams = this._activeRoute.snapshot.params;
        if (qParams.operation === 'update') {
          this.restaurantService.loadRestaurantById(qParams.id);
          this.restaurantId = qParams.id;
        } else {
          this.restaurantId = null;
        }
      });


    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (this.user.user.type === 'ADMIN') {
      this.status = 'APPROVED';
    } else if (this.user.user.type === 'PURCHASING') {
      this.status = 'PURCHASING-ACCOUNT';
    } else if (this.user.user.type === 'SURVEY') {
      this.status = 'SURVEY-ACCOUNT';
    } else if (this.user.user.type === 'OPERATION') {
      this.status = 'OPERATION-ACCOUNT';
    }

    this.restaurantService.loadCities();

    /* Init Form and input validations */
    /* this.restaurantService.restaurantForm = this.formBuilder.group({
       nameEn: ['', [Validators.required, Validators.maxLength(20)]],
       nameAr: ['', [Validators.required, Validators.maxLength(20)]],
       phoneNumber: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9]\\d+$')]],
       price: ['', [Validators.required]],
       oilType: ['', [Validators.required]],
       class: ['', [Validators.required]],
       outletSpace: ['', [Validators.required]],
       estimatedQty: ['', [Validators.required]],
       paymentMethod: ['', [Validators.required]],
       note: [''],

       firstName: ['', [Validators.required, Validators.maxLength(20)]],
       lastName: ['', [Validators.required, Validators.maxLength(20)]],
       contactNo: ['', [Validators.required]],
       title: ['', [Validators.required]],
       email: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('.{1,}@[_a-z0-9A-Z]+(\\.[a-z0-9A-Z]+)+')]],
       userName: ['', [Validators.required]],
       password: ['', [Validators.required]],
       confirmPassword: ['', [Validators.required]],
       city: ['', [Validators.required]],
       area: ['', [Validators.required]],
       address: ['', [Validators.required]],

     });*/
  }

  /* When Form submitted*/
  onSubmit() {
    this.loading = true;
    if (this.restaurantService.restaurantForm.valid) {

      const branches = JSON.stringify([{
        destination: [this.restaurantService.restaurantForm.controls['longitude'].value, this.restaurantService.restaurantForm.controls['latitude'].value],
        area: this.restaurantService.restaurantForm.controls['area'].value,
        address: this.restaurantService.restaurantForm.controls['address'].value,
        city: this.restaurantService.restaurantForm.controls['city'].value
      }
      ]);

      if (this.restaurantId !== null) {
        let params = {
          restaurantName: this.restaurantService.restaurantForm.controls['nameEn'].value,
          average: this.restaurantService.restaurantForm.controls['estimatedQty'].value,
          price: this.restaurantService.restaurantForm.controls['price'].value,
          space: this.restaurantService.restaurantForm.controls['outletSpace'].value,
          address: this.restaurantService.restaurantForm.controls['address'].value,
          branchesNumber: 1,
          // firstName: this.restaurantService.restaurantForm.controls['firstName'].value,
          //  lastName: this.restaurantService.restaurantForm.controls['lastName'].value,
          phone: this.restaurantService.restaurantForm.controls['contactNo'].value,
          outletPhoneNumber: this.restaurantService.restaurantForm.controls['phoneNumber'].value,
          status: this.status,
          director: this.user.user.id,
          branches: branches,
          type: this.user.user.type,
          //password: this.restaurantService.restaurantForm.controls['password'].value,
          title: this.restaurantService.restaurantForm.controls['title'].value,
          username: this.restaurantService.restaurantForm.controls['userName'].value,
          oilType: this.restaurantService.restaurantForm.controls['oilType'].value,
          payType: this.restaurantService.restaurantForm.controls['paymentMethod'].value,
          restaurantName_ar: this.restaurantService.restaurantForm.controls['nameAr'].value,
          class: this.restaurantService.restaurantForm.controls['class'].value,
          note: this.restaurantService.restaurantForm.controls['note'].value,
        };
        if (this.restaurantService.restaurantForm.controls['email'].value !== '') {
          params = Object.assign(params, {email: this.restaurantService.restaurantForm.controls['email'].value});
        }
        const result = this.httpClient.put<any[]>('/api/v1/restaurant/' + this.restaurantId, params).subscribe(resultData => {
          if (resultData['id']) {
            this.formMsg = 'Restaurant updated successfuly';
            this.class = 'success';
            this.loading = false;

          } else {
            this.formMsg = resultData['errors'][0]['msg'];
            this.class = 'error';
            this.loading = false;

          }
        }, (resultData) => {

          this.formMsg = resultData['error']['errors'][0]['msg'];
          this.class = 'error';
          this.loading = false;

        }, () => {

        });
      } else {
        let params = {
          restaurantName: this.restaurantService.restaurantForm.controls['nameEn'].value,
          average: this.restaurantService.restaurantForm.controls['estimatedQty'].value,
          price: this.restaurantService.restaurantForm.controls['price'].value,
          space: this.restaurantService.restaurantForm.controls['outletSpace'].value,
          address: this.restaurantService.restaurantForm.controls['address'].value,
          branchesNumber: 1,
          firstName: this.restaurantService.restaurantForm.controls['firstName'].value,
          lastName: this.restaurantService.restaurantForm.controls['lastName'].value,
          phone: this.restaurantService.restaurantForm.controls['contactNo'].value,
          outletPhoneNumber: this.restaurantService.restaurantForm.controls['phoneNumber'].value,
          status: this.status,
          director: this.user.user.id,
          branches: branches,
          type: this.user.user.type,
          password: this.restaurantService.restaurantForm.controls['password'].value,
          title: this.restaurantService.restaurantForm.controls['title'].value,
          username: this.restaurantService.restaurantForm.controls['userName'].value,
          oilType: this.restaurantService.restaurantForm.controls['oilType'].value,
          payType: this.restaurantService.restaurantForm.controls['paymentMethod'].value,
          restaurantName_ar: this.restaurantService.restaurantForm.controls['nameAr'].value,
          class: this.restaurantService.restaurantForm.controls['class'].value,
          note: this.restaurantService.restaurantForm.controls['note'].value,
        };
        if (this.restaurantService.restaurantForm.controls['email'].value !== '') {
          params = Object.assign(params, {email: this.restaurantService.restaurantForm.controls['email'].value});
        }
        const result = this.httpClient.post<any[]>('/api/v1/restaurant', params).subscribe(resultData => {
          if (resultData['id']) {
            this.formMsg = 'Restaurant created successfuly';
            this.class = 'success';
            this.router.navigate(['/outlets']);

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
      Object.keys(this.restaurantService.restaurantForm.controls).forEach(field => {
        console.log(this.restaurantService.restaurantForm.get(field).errors);
        const control = this.restaurantService.restaurantForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
      this.loading = false;
    }
  }
}



