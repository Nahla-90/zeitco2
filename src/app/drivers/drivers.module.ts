import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DriversComponent} from '../drivers/drivers/drivers.component';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';

import {RouterModule, Routes} from '@angular/router';
import {Route} from '@app/core';
import {BoxModule, BoxInfoModule, BreadcrumbsModule} from 'angular-admin-lte';       //Box component
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';

const routes: Routes = [
  Route.withShell([
    {path: 'assign-order/:id', component: DriversComponent},
  ])
];

@NgModule({
  declarations: [DriversComponent],
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
    CalendarModule,

    // InputNumberModule
  ],
  providers: []
})
export class DriversModule {
}
