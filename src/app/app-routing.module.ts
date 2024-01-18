// @ts-ignore
import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import{EmployeeListComponent} from "./employee-list/employee-list.component";
import {DetailedViewComponent} from "./detailed-view/detailed-view.component";

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
  redirectTo: employeeRoute.path,
  pathMatch: "full"
}

const routes: Routes = [
  invalidRoute,
  employeeRoute,
  detailedViewRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
