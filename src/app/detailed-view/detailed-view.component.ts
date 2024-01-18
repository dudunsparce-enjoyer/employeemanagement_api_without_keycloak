import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../Employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {
  employee$: Observable<Employee> | undefined;
  id: number | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Konvertiere den Parameter in eine Zahl
      this.fetchData();
    });
  }

  fetchData() {
    this.employee$ = this.http.get<Employee>(
      'http://localhost:8089/employees/' + this.id,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    );
  }
}
