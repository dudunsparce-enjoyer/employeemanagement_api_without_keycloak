// @ts-ignore
import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DetailedViewComponent } from './detailed-view/detailed-view.component';

const employeeRoute: Route = {
  path: 'employee',
  component: EmployeeListComponent
}

const detailedViewRoute: Route = {
  path: 'employee/:id',
  component: DetailedViewComponent
}

const invalidRoute: Route = {
  path: '**',
  redirectTo: '/employee',
  pathMatch: "full"
}

const routes: Routes = [
  employeeRoute,
  detailedViewRoute,
  { path: 'employee/create', component: DetailedViewComponent },
  invalidRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
