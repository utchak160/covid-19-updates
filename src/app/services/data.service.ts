import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {Data, GlobalData, ResponseData} from '../models/data';
import {map, take, tap} from 'rxjs/operators';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: HttpService,
              private alertBar: AlertService) {
  }
  getNames(): Observable<string[]> {
    return this.http.get<ResponseData>().pipe(
      map(res => res.Countries.map(data => data.Country)),
      tap((res) => {
        console.log('[Data]', res);
      }, e => {
        console.log(e);
      })
    );
  }

  getCountryData(name: string): Observable<Data> {
    return this.http.get<ResponseData>().pipe(
      map(res => res.Countries.filter(data => data.Country === name)[0]),
      tap((res) => {
        this.alertBar.success('Successfully fetched');
        console.log(res);
      }, e => {
        console.log(e);
        this.alertBar.error('Server is Busy. Please try again after sometime');
      })
    );
  }


  getGlobalData(): Observable<GlobalData> {
    return this.http.get<ResponseData>().pipe(
      take(1),
      map(res => res.Global),
      tap((res) => {
        console.log('[Global]', res);
      }, e => {
        console.log(e);
      })
    );
  }
}
