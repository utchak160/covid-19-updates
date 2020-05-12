import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data, GlobalData, ResponseData} from './models/data';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = '';
  date: Date;
  index: number;
  cnames: string[];
  global: GlobalData;
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();

  title = 'COVID-19';
  data: Data[];
  single: { name: string; value: number }[];

  view: any[] = [750, 550];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Total Cases';
  timeline = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<ResponseData>('https://api.covid19api.com/summary').pipe(
      map(res => {
        this.data = res.Countries;
        this.global = res.Global;
        this.cnames = this.data.map(i => i.Country);
      })
    ).subscribe((res) => {
      // this.cnames = this.data.map(i => i.Country);
    }, (error) => {
      alert('Server is Busy. Please refresh your page');
      console.log(error);
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cnames.filter(option => option.toLowerCase().includes(filterValue));
  }

   OnInput(event: any) {

    this.http.get<ResponseData>('https://api.covid19api.com/summary').pipe(
      map(res => {
        this.data = res.Countries;
      })
    ).subscribe((res) => {
      this.name = event.target.value;
      this.index = this.cnames.indexOf(this.name);
      this.date = this.data[this.index].Date;
      this.name = this.data[this.index].Country + `(${this.data[this.index].CountryCode})`;
      this.single = [
        {
          name: 'Total Confirmed',
          value: this.data[this.index].TotalConfirmed
        },
        {
          name: 'Total Deaths',
          value: this.data[this.index].TotalDeaths
        },
        {
          name: 'Total Recovered',
          value: this.data[this.index].TotalRecovered
        },
        {
          name: 'New Confirmed',
          value: this.data[this.index].NewConfirmed
        },
        {
          name: 'New Deaths',
          value: this.data[this.index].NewDeaths
        },
        {
          name: 'New Recovered',
          value: this.data[this.index].NewRecovered
        }
      ];
    }, (e) => {
      console.log(e.message);
      alert('Something Went Wrong! Please try again');
    });
  }
}
