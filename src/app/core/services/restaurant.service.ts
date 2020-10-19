import {HttpClient, HttpParams} from '@angular/common/http';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [Validators]
})
/* Service to simplify PrimeNG table function */
/**
 * PrimeNG is a collection of rich UI components for Angular.
 * https://www.primefaces.org/primeng
 */
export class RestaurantService {
  public areas = [];
  public cities = [];
  public restaurant = {
    nameEn: '',
    nameAr: '',
    phoneNumber: '',
    price: '',
    oilType: '',
    class: '',
    outletSpace: '',
    estimatedQty: '',
    paymentMethod: '',
    note: '',
    firstName: '',
    lastName: '',
    contactNo: '',
    title: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    city: '',
    area: '',
    address: '',
    cityName: '',
    areaName: '',
  };
  restaurantForm: FormGroup = this.formBuilder.group({
    nameEn: [this.restaurant.nameEn, [Validators.required, Validators.maxLength(20)]],
    nameAr: [this.restaurant.nameAr, [Validators.required, Validators.maxLength(20)]],
    phoneNumber: [this.restaurant.phoneNumber, [Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9]\\d+$')]],
    price: [this.restaurant.price, [Validators.required]],
    oilType: [this.restaurant.oilType, [Validators.required]],
    class: [this.restaurant.class, [Validators.required]],
    outletSpace: [this.restaurant.outletSpace, [Validators.required]],
    estimatedQty: [this.restaurant.estimatedQty, [Validators.required]],
    paymentMethod: [this.restaurant.paymentMethod, [Validators.required]],
    note: [this.restaurant.note],

    firstName: [this.restaurant.firstName, [Validators.required, Validators.maxLength(20)]],
    lastName: [this.restaurant.lastName, [Validators.required, Validators.maxLength(20)]],
    contactNo: [this.restaurant.contactNo, [Validators.required]],
    title: [this.restaurant.title, [Validators.required]],
    email: [this.restaurant.email, [Validators.required, Validators.maxLength(30), Validators.pattern('.{1,}@[_a-z0-9A-Z]+(\\.[a-z0-9A-Z]+)+')]],
    userName: [this.restaurant.userName, [Validators.required]],
    password: [this.restaurant.password, [Validators.required]],
    confirmPassword: [this.restaurant.confirmPassword, [Validators.required, this.equalToPassword()]],
    city: [this.restaurant.city, [Validators.required]],
    area: [this.restaurant.area, [Validators.required]],
    address: [this.restaurant.address, [Validators.required]],

  }
);


  public constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {
  }

  loadRestaurantById(id) {
    const result = this.httpClient.get<any[]>('/api/v1/restaurant/' + id).subscribe(
      (resultData: any) => {
        this.restaurant = {
          nameEn: resultData.restaurantName,
          nameAr: resultData.restaurantName_ar,
          phoneNumber: resultData.outletPhoneNumber,
          price: resultData.price,
          oilType: resultData.oilType,
          class: resultData.class,
          outletSpace: resultData.space,
          estimatedQty: resultData.average,
          paymentMethod: resultData.payType,
          note: resultData.note,
          firstName: resultData.firstName,
          lastName: resultData.lastName,
          contactNo: resultData.phone,
          title: resultData.title,
          email: resultData.email,
          userName: resultData.username,
          password: '',
          confirmPassword: '',
          city: resultData.branches[0].city.id,
          area: resultData.branches[0].area.id,
          cityName: resultData.branches[0].city.cityName,
          areaName: resultData.branches[0].area.areaName,
          address: resultData.branches[0].address,
        };
      }, error => {
        console.log(error);
      },
      () => {
        this.restaurantForm = this.formBuilder.group({
          nameEn: [this.restaurant.nameEn, [Validators.required, Validators.maxLength(20)]],
          nameAr: [this.restaurant.nameAr, [Validators.required, Validators.maxLength(20)]],
          phoneNumber: [this.restaurant.phoneNumber, [Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9]\\d+$')]],
          price: [this.restaurant.price, [Validators.required]],
          oilType: [this.restaurant.oilType, [Validators.required]],
          class: [this.restaurant.class, [Validators.required]],
          outletSpace: [this.restaurant.outletSpace, [Validators.required]],
          estimatedQty: [this.restaurant.estimatedQty, [Validators.required]],
          paymentMethod: [this.restaurant.paymentMethod, [Validators.required]],
          note: [this.restaurant.note],

          contactNo: [this.restaurant.contactNo, [Validators.required ,Validators.maxLength(20), Validators.pattern('^[0-9]\\d+$')]],
          title: [this.restaurant.title, [Validators.required]],
          email: [this.restaurant.email, [Validators.required, Validators.maxLength(30), Validators.pattern('.{1,}@[_a-z0-9A-Z]+(\\.[a-z0-9A-Z]+)+')]],
          userName: [this.restaurant.userName, [Validators.required]],
          city: [this.restaurant.city, [Validators.required]],
          area: [this.restaurant.area, [Validators.required]],
          address: [this.restaurant.address, [Validators.required]],

        });
        this.loadAreas();

      });
  }
  equalToPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control && control.parent && control.value === control.parent.controls['password'].value) {
        return null;
      } else {
        return {'notEqualPassword': true};
      }
    };
  }
  loadAreas() {
    if (this.restaurantForm.controls['city'].value > 0) {
      this.areas = [];
      const result = this.httpClient.get<any[]>('/api/v1/cities/' + this.restaurantForm.controls['city'].value + '/areas').subscribe(
        (resultData: any) => {
          this.areas = resultData;
        }, error => {
          console.log(error);
        });
    }
  }

  public loadCities() {
    const result = this.httpClient.get<any[]>('/api/v1/cities').subscribe(
      (resultData: any) => {
        this.cities = resultData;
      }, error => {
        console.log(error);
      });
  }

}
