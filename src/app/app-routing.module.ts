// @ts-ignore
import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import{EmployeeListComponent} from "./employee-list/employee-list.component";
import {DetailedViewComponent} from "./detailed-view/detailed-view.component";

const detailedViewRoute: Route = {
  path: 'employee/:id',
  component: DetailedViewComponent
}

const routes: Routes = [
  { path: '**', redirectTo: '/employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeListComponent},
  detailedViewRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
