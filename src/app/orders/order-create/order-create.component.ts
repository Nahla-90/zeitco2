import {Component, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import * as io from 'socket.io-client';
//import {io} from 'socket.io-client/build/index';
import {environment} from '../../../environments/environment';
import {parseArguments} from '@angular/cli/models/parser';
import {Observable} from 'rxjs';

@NgModule({
  imports: [Validators]
})
@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent{
  public loading = false;
  public formMsg = '';
  public class = '';
  public qtyKgs = [10, 20, 30, 40, 50];
  public restaurants = [];
  public user;
  //private socket: any;
  // @ts-ignore
  socket: SocketIOClient.Socket;

  public orderForm: FormGroup = this.formBuilder.group({
    restaurant: ['', [Validators.required]],
    qty: ['', [Validators.required]],
    price: ['', [Validators.required]],
    date: ['', [Validators.required]]
  });

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private _activeRoute: ActivatedRoute,
              private router: Router) {

    this.loadRestaurants();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    // @ts-ignore
    this.socket = io(environment.serverUrl+'/order', {query: `id=49`, transports: ['websocket', 'xhr-polling']});

  }
  /* When Form submitted*/
  onSubmit() {
    this.loading = false;
    if (this.orderForm.valid) {

      let params = {
        restaurant: this.orderForm.controls['restaurant'].value, //resturant id,
        average: this.orderForm.controls['qty'].value,
        date: this.orderForm.controls['date'].value,
        userId: this.user.user.id,
        branch: '0'
      };

      this.socket.emit('newOrder', params);

      this.formMsg = 'order created successfuly';
      this.class = 'success';
      // this.router.navigate(['/orders']);

    } else {
      /* Invalid Form Data Will Display Validation Errors*/
      Object.keys(this.orderForm.controls).forEach(field => {
        console.log(this.orderForm.get(field).errors);
        const control = this.orderForm.get(field);
        control.markAsTouched({onlySelf: true});
      });
      this.loading = false;
    }
  }

  public loadRestaurants() {
    let params = new HttpParams()
      .set('status', 'APPROVED')
      .set('withoutPagenation', String(true));

    // @ts-ignore
    const result = this.httpClient.get<any[]>('/api/v1/restaurant', {params}).subscribe(
      (resultData: any) => {
        this.restaurants = resultData;
      }, error => {
        console.log(error);
      });
  }


  listen(eventName: string) {
    return new Observable((subscriber => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    }));
  }
}



