import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RestaurantComponent} from '../restaurant/restaurant/restaurant.component';
import {RestaurantCreateComponent} from '../restaurant/restaurant-create/restaurant-create.component';
import {RestaurantViewComponent} from '../restaurant/restaurant-view/restaurant-view.component';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';

import {RouterModule, Routes} from '@angular/router';
import {UsersModule} from '../users/users.module';

import {Route} from '@app/core';
import {BoxModule, BoxInfoModule, BreadcrumbsModule} from 'angular-admin-lte';       //Box component
import {DialogModule} from 'primeng/dialog';

const routes: Routes = [
  Route.withShell([
    {path: 'outlets', component: RestaurantComponent},
    {path: 'outlets/create', component: RestaurantCreateComponent},
    {path: 'outlets/:status', component: RestaurantComponent},
    {path: 'outlets/:id/view', component: RestaurantViewComponent},
    {path: 'outlets/:id/:operation', component: RestaurantCreateComponent},


  ])
];

@NgModule({
  declarations: [RestaurantComponent, RestaurantCreateComponent, RestaurantViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    BoxModule,
    BoxInfoModule,
    ButtonModule,
    DropdownModule,
    BreadcrumbsModule,
    DialogModule,
    UsersModule
    // InputNumberModule
  ],
  providers: []
})
export class RestaurantModule {
}
