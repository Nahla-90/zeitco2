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
import {Route} from '@app/core';
import {BoxModule, BoxInfoModule, BreadcrumbsModule} from 'angular-admin-lte';       //Box component

const routes: Routes = [
  Route.withShell([
    {path: 'restaurants', component: RestaurantComponent},
    {path: 'restaurants/create', component: RestaurantCreateComponent},
    {path: 'restaurants/:id/view', component: RestaurantViewComponent},
    {path: 'restaurants/:id/:operation', component: RestaurantCreateComponent},


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
    BreadcrumbsModule
    // InputNumberModule
  ],
  providers: []
})
export class RestaurantModule {
}
