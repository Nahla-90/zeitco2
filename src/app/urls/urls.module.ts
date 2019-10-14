import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UrlsComponent} from '../urls/urls/urls.component';
import {UrlCreateComponent} from '../urls/url-create/url-create.component';
import {TableModule} from 'primeng/table';
import {RouterModule, Routes} from '@angular/router';
import {Route} from '@app/core';

const routes: Routes = [
  Route.withShell([
    {path: 'urls', component: UrlsComponent},
    {path: 'urls/create', component: UrlCreateComponent},
  ])
];

@NgModule({
  declarations: [UrlsComponent, UrlCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TableModule
  ],
  providers: []
})
export class UrlsModule {
}
