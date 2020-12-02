import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from '../app/core/core.module';
import {LoginModule} from '../app/login/login.module';
import {UrlsModule} from '../app/urls/urls.module';
import {RestaurantModule} from '../app/restaurant/restaurant.module';
import {RegisterModule} from './register/register.module';
import {UsersModule} from './users/users.module';
import {CitiesModule} from './cities/cities.module';
import {AreasModule} from './areas/areas.module';
import {OrdersModule} from './orders/orders.module';
import {DriversModule} from './drivers/drivers.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LoginModule,
    UrlsModule,
    RestaurantModule,
    RegisterModule,
    UsersModule,
    CitiesModule,
    AreasModule,
    OrdersModule,
    DriversModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
