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
import {AreaModule} from './areas/area.module';

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
    AreaModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
