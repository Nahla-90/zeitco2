import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrdersComponent} from '../orders/orders/orders.component';
import {OrderCreateComponent} from '../orders/order-create/order-create.component';
import {OrderViewComponent} from '../orders/order-view/order-view.component';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';

import {RouterModule, Routes} from '@angular/router';
import {UsersModule} from '../users/users.module';

import {Route} from '@app/core';
import {BoxModule, BoxInfoModule, BreadcrumbsModule} from 'angular-admin-lte';       //Box component
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'https://zeitco.herokuapp.com/order', options: {} };

const routes: Routes = [
  Route.withShell([
    {path: 'orders', component: OrdersComponent},
    {path: 'orders/create', component: OrderCreateComponent},
    {path: 'orders/:status', component: OrdersComponent},
    {path: 'orders/:id/view', component: OrderViewComponent},
  ])
];

@NgModule({
  declarations: [OrdersComponent, OrderCreateComponent, OrderViewComponent],
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
    UsersModule,
    CalendarModule,
    SocketIoModule.forRoot(config)
    // InputNumberModule
  ],
  providers: []
})
export class OrdersModule {
}
