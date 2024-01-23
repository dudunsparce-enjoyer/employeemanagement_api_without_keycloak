import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Employee} from '../Employee';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl, FormGroup} from "@angular/forms";
import {Qualification} from "../Qualification";
import {EmployeeListComponent} from "../employee-list/employee-list.component";

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {
  id: number | undefined;
  employeeForm = new FormGroup({
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    street: new FormControl(''),
    postcode: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl('')
  });
  public skillSet?: Array<Qualification>

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
  }

  saveEmployee() {
    const employee: Employee = {
      id: this.id,
      ...this.employeeForm.value,
      lastName: this.employeeForm.value.lastName || '',
      firstName: this.employeeForm.value.firstName || '',
      street: this.employeeForm.value.street || '',
      postcode: this.employeeForm.value.postcode || '',
      city: this.employeeForm.value.city || '',
      phone: this.employeeForm.value.phone || '',
      skillSet: this.skillSet // todo: while the skillSet is now in fact sent to the backend, unfortunately the backend expects only the id of the skillSet
    };

    if (!this.id) {
      this.createEmployee(employee);
    } else {
      this.updateEmployee(employee);
    }
  }

  createEmployee(employee: Employee) {
    this.http.post('http://localhost:8089/employees', employee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe(() => {
      window.location.href = "../";
    });
  }

  updateEmployee(employee: Employee) {
    this.http.put(`http://localhost:8089/employees/${employee.id}`, employee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe(() => {
      window.location.href = "../";
    });
  }

  deleteEmployee() {
    this.http.delete(`http://localhost:8089/employees/${this.id}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe(() => {
      window.location.href = "../";
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.skillSet = params['skillSet'];
      console.log(this.skillSet);
      this.fetchData();
    });
  }

  fetchData() {
    if (!this.id) {
      this.employeeForm.setValue({
        lastName: '',
        firstName: '',
        street: '',
        postcode: '',
        city: '',
        phone: ''
      });
    } else {
      this.http.get<Employee>(
        'http://localhost:8089/employees/' + this.id,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      ).subscribe((employee: Employee) => {
        this.employeeForm.setValue({
          lastName: employee.lastName || null,
          firstName: employee.firstName || null,
          street: employee.street || null,
          postcode: employee.postcode || null,
          city: employee.city || null,
          phone: employee.phone || null
        });
        this.skillSet = employee.skillSet;
      });
    }
  }

  openPopupWindow() {
    let popupBackground: HTMLDivElement | null = document.querySelector(".popupBackground");

    if (popupBackground !== null) {
      popupBackground.style.display = "grid";
    }
  }

  closePopupWindow() {
    let popupBackground: HTMLDivElement | null = document.querySelector(".popupBackground");

    if (popupBackground !== null) {
      popupBackground.style.display = "";
    }
  }

  closeDetailedView() {
    window.location.href = "../";
  }

  protected readonly EmployeeListComponent = EmployeeListComponent;
}
