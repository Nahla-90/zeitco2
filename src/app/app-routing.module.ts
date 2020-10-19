import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Route } from '../app/core';

const routes: Routes = [
  Route.withShell([
    {path: '', redirectTo: '/restaurants', pathMatch: 'full'},
  ]),
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
