import {Component} from '@angular/core';
import {map, Observable, of} from "rxjs";
import {Employee} from "../Employee";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from '@angular/router';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  employees$: Observable<Employee[]>;

  constructor(private http: HttpClient, private router: Router) {
    this.employees$ = of([]);
    this.fetchData();
  }


  fetchData() {
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).pipe(
      // @ts-ignore
      map(messages => messages.sort((a1: Employee, a2: Employee) => a1.id - a2.id))
    );
  }

  createEmployee() {
    void this.router.navigate(['/employee/create']);
  }

  redirectToDetailedView(id: number | undefined) {
    window.location.href += "/" + id;
  }
}
