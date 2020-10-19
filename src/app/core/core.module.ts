import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {HttpService} from './services/http.service';
import {HttpCacheService} from './services/http-cache.service';
import {ApiPrefixInterceptor} from './services/api-prefix.interceptor';
import {ErrorHandlerInterceptor} from './services/error-handler.interceptor';
import {CacheInterceptor} from './services/cache.interceptor';
import {ShellComponent} from './shell/shell.component';
import {RouteReusableStrategy} from './route-reusable-strategy';
import {AuthenticationService} from './services/authentication.service';
import {AuthenticationGuard} from './services/authentication.guard';
import {LayoutModule} from 'angular-admin-lte';   //Import the layout module.
export var adminLteConf = {
  skin: 'blue',
  sidebarLeftMenu: [
    {label: 'MAIN NAVIGATION', separator: true},
    // {label: 'Restaurants', route: '/restaurants', iconClasses: 'fa fa-th'}
    {
      label: 'Restaurants', iconClasses: 'fa fa-files-o', children: [
        {label: 'Approved', route: '/restaurants'}
      ]
    }
  ]
};

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule, LayoutModule.forRoot(adminLteConf)],
  declarations: [ShellComponent],
  exports: [
    ShellComponent
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    },
    HttpCacheService,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    CacheInterceptor,
    {
      provide: HttpClient,
      useClass: HttpService
    }]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
