import { Component, OnInit } from '@angular/core';
import {Data, GlobalData, ResponseData} from '../models/data';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['Country Name', 'New Confirmed', 'New Death', 'New Recovered', 'Total Recovered', 'Total Deaths', 'Total Confirmed'];
  data: Data[];
  global: GlobalData;
  appear = false;
  private BASE_URL = 'https://api.covid19api.com/summary';
  constructor(private http: HttpClient) { }
  ngOnInit() {
    // this.http.getData().subscribe((res) => {
    //   this.data = res.Countries;
    //   console.log(this.data);
    // }, (e) => {
    //   console.log(e.message);
    // });

    this.http.get<ResponseData>(this.BASE_URL).pipe(map(res => {
      console.log(res.Global);
      this.data = res.Countries;
      // this.global = res.Global;
    }, (e) => {
      console.log(e.message);
    })).subscribe();
  }

  show() {
    this.http.get<ResponseData>(this.BASE_URL).pipe(map(res => {
      this.global = res.Global;
    })).subscribe(() => {
      this.appear = !this.appear;
    });
  }
}
