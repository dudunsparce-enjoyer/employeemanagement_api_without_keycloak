import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../Employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  updateEmployee() {
    const updatedEmployee: Employee = {
      id: this.id,
      ...this.employeeForm.value,
      lastName: this.employeeForm.value.lastName || '',
      firstName: this.employeeForm.value.firstName || '',
      street: this.employeeForm.value.street || '',
      postcode: this.employeeForm.value.postcode || '',
      city: this.employeeForm.value.city || '',
      phone: this.employeeForm.value.phone || ''
    };

    this.http.put(`http://localhost:8089/employees/${updatedEmployee.id}`, updatedEmployee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe();

    window.location.href = "../";
    if (this.id === 0) {
      this.http.post('http://localhost:8089/employees', updatedEmployee, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      }).subscribe();
    } else {
      this.http.put(`http://localhost:8089/employees/${updatedEmployee.id}`, updatedEmployee, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      }).subscribe();
    }
  }

  deleteEmployee() {
    this.http.delete(`http://localhost:8089/employees/${this.id}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).subscribe();

    window.location.href = "../";
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Konvertiere den Parameter in eine Zahl
      this.fetchData();
    });
  }

  fetchData() {
    if (this.id === 0) {
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
      });
    }
  }
}
