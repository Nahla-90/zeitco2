import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersComponent} from '../users/users/users.component';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';

import {RouterModule, Routes} from '@angular/router';
import {Route} from '@app/core';
import {BoxModule, BoxInfoModule, BreadcrumbsModule} from 'angular-admin-lte';       //Box component
import {DialogModule} from 'primeng/dialog';

const routes: Routes = [
  Route.withShell([
    {path: 'users', component: UsersComponent},
  /*  {path: 'cities/create', component: CitiesCreateComponent},
    {path: 'cities/:id/:operation', component: CitiesCreateComponent},*/
  ])
];

@NgModule({
  declarations: [UsersComponent],
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
    DialogModule
    // InputNumberModule
  ],
  providers: [],
  exports:[UsersComponent]
})
export class UsersModule {
}
