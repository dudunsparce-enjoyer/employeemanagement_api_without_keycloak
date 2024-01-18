import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DetailedViewComponent } from './detailed-view/detailed-view.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeListComponent },
  { path: 'employee/:id', component: DetailedViewComponent },
  { path: '**', redirectTo: '/employee', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
