import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AreaCreateComponent} from '../areas/area-create/area-create.component';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';

import {RouterModule, Routes} from '@angular/router';
import {Route} from '@app/core';
import {BoxModule, BoxInfoModule, BreadcrumbsModule} from 'angular-admin-lte';       //Box component
import {DialogModule} from 'primeng/dialog';

const routes: Routes = [
  Route.withShell([
    {path: 'area/create', component: AreaCreateComponent},
    {path: 'area/:id/:cityId', component: AreaCreateComponent}
  ])
];

@NgModule({
  declarations: [AreaCreateComponent],
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
  providers: []
})
export class AreaModule {
}
