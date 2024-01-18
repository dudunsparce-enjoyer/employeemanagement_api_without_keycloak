import { Component } from '@angular/core';
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {Observable, of} from "rxjs";
import {Employee} from "../Employee";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent {
  employee$: Observable<Employee>;

  constructor(private http: HttpClient, public id: Number) {
    this.employee$ = of();
    this.fetchData();
  }

  fetchData() {
    this.employee$ = this.http.get<Employee>('http://localhost:8089/employees/' + this.id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

}
