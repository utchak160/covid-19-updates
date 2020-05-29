import {Component, OnInit} from '@angular/core';
import {Data, GlobalData} from './models/data';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {DataService} from './services/data.service';
import {AlertService} from './services/alert.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = '';
  date: Date;
  cnames: string[];
  global: GlobalData;
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();

  title = 'COVID-19';
  single: { name: string; value: number }[];

  // view: any[] = [750, 550];
  view: any[];
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

  constructor(private dataService: DataService,
              private alertService: AlertService) {
    this.view = [innerWidth / 1.6, 450];
  }

  ngOnInit() {
    this.dataService.getNames().subscribe((res) => {
      this.cnames = res;
    });
    this.dataService.getGlobalData().subscribe((res) => {
      this.global = res;
    }, error => {
      console.log(error);
      this.alertService.error('Server is Busy. Please refresh your page');
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cnames.filter(option => option.toLowerCase().includes(filterValue));
  }
  onInput(event: any) {
    this.dataService.getCountryData(event.target.value).subscribe((res) => {
      this.date = res.Date;
      this.name = res.Country + `(${res.CountryCode})`;
      this.single = [
        {
          name: 'Total Confirmed',
          value: res.TotalConfirmed
        },
        {
          name: 'Total Deaths',
          value: res.TotalDeaths
        },
        {
          name: 'Total Recovered',
          value: res.TotalRecovered
        },
        {
          name: 'New Confirmed',
          value: res.NewConfirmed
        },
        {
          name: 'New Deaths',
          value: res.NewDeaths
        },
        {
          name: 'New Recovered',
          value: res.NewRecovered
        }
      ];
    }, (e) => {
      console.log(e.message);
      this.alertService.error('Something Went Wrong! Please try again');
    });
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }
}
