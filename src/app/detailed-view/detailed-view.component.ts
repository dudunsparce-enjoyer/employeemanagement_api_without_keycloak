import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Employee} from '../Employee';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl, FormGroup} from "@angular/forms";
import {Qualification} from "../Qualification";
import {Observable} from "rxjs";

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {
  skills$: Observable<Qualification[]>;
  id: number | undefined;
  employeeForm = new FormGroup({
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    street: new FormControl(''),
    postcode: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl(''),
    skillSet: new FormControl<Qualification[]>([]),
    skillSetDisplay: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.skills$ = this.http.get<Qualification[]>('http://localhost:8089/qualifications', {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  saveEmployee() {
    const formValue = this.employeeForm.value;
    let employee: Employee = {
      id: this.id,
      ...formValue,
      lastName: this.employeeForm.value.lastName || '',
      firstName: this.employeeForm.value.firstName || '',
      street: this.employeeForm.value.street || '',
      postcode: this.employeeForm.value.postcode || '',
      city: this.employeeForm.value.city || '',
      phone: this.employeeForm.value.phone || '',
      skillSet: formValue.skillSet ? formValue.skillSet.map((skill: Qualification) => skill) : []
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
    if (!this.id) {
      this.employeeForm.setValue({
        lastName: '',
        firstName: '',
        street: '',
        postcode: '',
        city: '',
        phone: '',
        skillSet: [],
        skillSetDisplay: ''
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
          phone: employee.phone || null,
          skillSet: employee.skillSet || [],
          skillSetDisplay: employee.skillSet ? employee.skillSet.map(skill => skill.id).join(', ') : ''
        });
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
}
